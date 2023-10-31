/*
    Cli para crear editar, eliminar, 
    crear archivos/directorios
    y que te retorna una tabla de archivos.
    En cualquier sistema operativo. 
    Desarrollado en octubre del 2023
    --Cristian Ronald---
*/
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define dirFile "./config/path.txt"
#ifdef __linux__
#define profile "~/"
#include <sys/stat.h>
#elif _WIN32
#include <windows.h>
#define profile "%USERPROFILE%/"
#endif
//Path main del directorio que revisara datos
void leerAyuda(){
    printf("Argumento:Descripcion\n");
    printf("--help: Muestra la ayuda.\n");
    printf("-c: Cambiar directorio base.\n");
    printf("-gd: Obtener directorio main.\n");
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
    char* n_path = concatPunt(comando, dirFile );
    #ifdef _WIN32
    if(CreateDirectory(s,NULL)!=0) printf("Se creo el directorio->");
    if(!system(concatPunt("echo ",n_path))) printf("Se cambio el directorio main a: %s\n",s);
    else printf("Hubo un error al crear el directorio");
    #else 
    if(mkdir(s,0777)==0) printf("Directorio creado con exito");
    else printf("Hubo un error al crear el directorio");
    #endif
}
void getMainDirectory(){
    puts(leerFile(dirFile));
}
void agregarDirectorio(char *s){
    char *path =concatPunt(leerFile(dirFile),"/");
    char *comando = concatPunt(path,s);
    //if(!system(concatPunt(comando,concatPunt(s,"\"")))) printf("Comando exitoso");
    //else printf("Ya existe el directorio\n");
    #ifdef _WIN32
    if(CreateDirectory(comando,NULL)!=0) printf("Directorio creado con exito");
    else printf("Hubo un error al crear el directorio");
    #else 
    if(mkdir(comando,0777)==0) printf("Directorio creado con exito");
    else printf("Hubo un error al crear el directorio");
    #endif

    free(path);
    //free(comando);
}
void agregarFile(char *s){
    char* comando = concatPunt(s,">> ");
    char* n_path = concatPunt(comando, leerFile(dirFile));
    if(!system(concatPunt("echo ",n_path))) printf("Se creo el archivo %s\n",s);
    else printf("Error inesperado");
}
void eliminarDirectorio(char *s){
    char *path =concatPunt(leerFile(dirFile),"/");
    char *comando = concatPunt("rd /s /q ",concatPunt("\"",path));
    if(!system(concatPunt(comando,concatPunt(s,"\"")))) printf("Se elimino el directorio %s\n",s);
    else printf("No encontrado\n");
    free(path);
    free(comando);
}
void eliminarFile(char *s){
    char *path =concatPunt(leerFile(dirFile),"/");
    char *comando = concatPunt("del ",concatPunt("\"",path));
    if(!system(concatPunt(comando,concatPunt(s,"\"")))) printf("Se elimino el directorio %s\n",s);
    else printf("No encontrado\n");
    free(path);
    free(comando);
}
#ifdef __linux__
void listar(){}
#elif _WIN32
void listarI(){
    int cont = 0;
   WIN32_FIND_DATA findFileData;
    HANDLE hFind = FindFirstFile(concatPunt(leerFile(dirFile),"/*"), &findFileData);
    if(hFind == INVALID_HANDLE_VALUE) {
        DWORD dwError = GetLastError(); // Obtiene el código de error
        printf("Error al abrir el directorio. Código de error: %d\n", dwError);
        return 1;
    }
    do {
      cont++;
      if(cont<3) continue;
      if(findFileData.dwFileAttributes & FILE_ATTRIBUTE_DIRECTORY) printf("%s,directorio\n", findFileData.cFileName);
      else printf("%s,archivo\n", findFileData.cFileName);
    } while (FindNextFile(hFind, &findFileData) != 0);

    FindClose(hFind); 
}
void listar(const char* carpeta){
  int cont = 0;
  char *path =concatPunt(concatPunt(leerFile(dirFile),"/"),concatPunt(carpeta,"/*"));
   WIN32_FIND_DATA findFileData;
    HANDLE hFind = FindFirstFile(path, &findFileData);
    if(hFind == INVALID_HANDLE_VALUE) {
        DWORD dwError = GetLastError(); // Obtiene el código de error
        printf("Error al abrir el directorio. Código de error: %d\n", dwError);
        return 1;
    }
    do {
      cont++;
      if(cont<3) continue;
      if(findFileData.dwFileAttributes & FILE_ATTRIBUTE_DIRECTORY) printf("%s,directorio\n", findFileData.cFileName);
      else printf("%s,archivo\n", findFileData.cFileName);
    } while (FindNextFile(hFind, &findFileData) != 0);

    FindClose(hFind); 
    free(path);
}
#endif
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
    if(!strcmp(argv[1],"-gd"))getMainDirectory(argv[2]);
    if(!strcmp(argv[1],"-ed"))eliminarDirectorio(argv[2]);
    if(!strcmp(argv[1],"-ef"))eliminarFile(argv[2]);
    if(!strcmp(argv[1],"-l"))listar(argv[2]);
    if(!strcmp(argv[1],"-li"))listarI();
    return 0;
}
