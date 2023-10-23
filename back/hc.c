/*
    Cli para crear editar, eliminar, 
    crear archivos/directorios
    y que te retorna una tabla de archivos.
    En cualquier sistema operativo. 
    Desarrollado en octubre del 2023
*/
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#ifdef __linux__
#define so "Linux"
#elif _WIN32
#define so "Windows"
#endif
//Path main del directorio que revisara datos
void leerAyuda(){
    printf("Argumento:Descripcion\n");
    printf("--help: Muestra la ayuda.\n");
    printf("-c: Cambiar directorio base.\n");
    printf("-af: Agregar archivo.\n");
    printf("-ad: Agregar directorio.\n");
    printf("-ef: Eliminar archivo.\n");
    printf("-ed: Eliminar directorio.\n");
    printf("Sinopsis:\n\thc [argumento] [Nombre]\n");
}
//Concatena dos strings
char* concatPunt(char *c1, char *c2){
    size_t lr = strlen(c1) + strlen(c2);
    char *cr =(char *)malloc(lr+1);
    strcpy(cr,c1);
    strcat(cr,c2);
    return cr;
}
char* leerFile(char* p){
     FILE *archivo = fopen(p, "r");
    if (archivo == NULL) {
        perror("Error al abrir el archivo");
        return NULL;
    }

    // Alojar memoria para la línea
    char *linea = (char *)malloc(1024); // Suponemos que una línea no excede los 1024 caracteres
    if (linea == NULL) {
        perror("Error al asignar memoria");
        fclose(archivo);
        return NULL;
    }

    // Leer la primera línea del archivo
    if (fgets(linea, 1024, archivo) == NULL) {
        free(linea);
        fclose(archivo);
        return NULL;
    }
    size_t longitud = strcspn(linea, "\n");
    linea[longitud] = '\0';

    fclose(archivo);
    return linea;
}

void cambiarDirectorioMain(char *s){
    char* comando = concatPunt(s,"> ");
    char* n_path = concatPunt(comando, " ./config/path.txt" );
    if(!system(concatPunt("echo ",n_path))) printf("Se cambio el directorio main a: %s\n",s);
    else printf("Error inesperado");
}
void agregarDirectorio(char *s){
    char *path =concatPunt(leerFile("./config/path.txt"),"/");
    char *comando = concatPunt("mkdir ",concatPunt("\"",path));
    if(!system(concatPunt(comando,concatPunt(s,"\"")))) printf("Comando exitoso");
    else printf("Ya existe el directorio\n");
    free(path);
    free(comando);
}
void agregarFile(char *s){
    char* comando = concatPunt(s,">> ");
    char* n_path = concatPunt(comando, leerFile("./config/path.txt"));
    if(!system(concatPunt("echo ",n_path))) printf("Se creo el archivo %s\n",s);
    else printf("Error inesperado");
}
void eliminarDirectorio(char *s){
    char *path =concatPunt(leerFile("./config/path.txt"),"/");
    char *comando = concatPunt("rd /s /q ",concatPunt("\"",path));
    if(!system(concatPunt(comando,concatPunt(s,"\"")))) printf("Se elimino el directorio %s\n",s);
    else printf("No encontrado\n");
    free(path);
    free(comando);
}
void eliminarFile(char *s){
    char *path =concatPunt(leerFile("./config/path.txt"),"/");
    char *comando = concatPunt("del ",concatPunt("\"",path));
    if(!system(concatPunt(comando,concatPunt(s,"\"")))) printf("Se elimino el directorio %s\n",s);
    else printf("No encontrado\n");
    free(path);
    free(comando);
}
int main(int argc, char const *argv[])
{
    //condicionales de inicio
    if(argc < 2){ 
        printf("Escribe hc --help\n");
        return 1;
     }
    if(!strcmp(argv[1],"--help"))leerAyuda();
    //condicionales de argumento
    if(!strcmp(argv[1],"-c"))cambiarDirectorioMain(argv[2]);
    if(!strcmp(argv[1],"-ad"))agregarDirectorio(argv[2]);
    if(!strcmp(argv[1],"-af"))agregarFile(argv[2]);
    if(!strcmp(argv[1],"-ed"))eliminarDirectorio(argv[2]);
    if(!strcmp(argv[1],"-ef"))eliminarFile(argv[2]);
    return 0;
}
