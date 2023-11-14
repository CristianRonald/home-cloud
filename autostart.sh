#!/bin/bash
echo "Iniciando nuevo servidor"
pathFil="$PWD/config/path.txt"
if [ -f "$pathFil" ]; then
	echo "Seguir manteniendo el mismo path: $(cat "$pathFil")"
	read opt
	if [[ "$opt" == "n" || "$opt" == "N" ]]; then
		echo "Ingresa el nombre: "
		read nombre
		dir=$(echo "~/$nombre")
		mkdir "$(echo ~)"/"$nombre"
		cd "$PWD/back" && hc -c "$dir" && cd ..
	fi
else
	echo "Dejar el path por defecto[S/n]:"
	read opt
	comando="$(echo ~/home-cloud)"
	if [[ "$opt" == "s" || "$opt" == "S" ]]; then
		cd "$PWD/back" && hc -c "$comando" && cd ..
	else 
	 	echo "Ingresa el nuevo nombre de la carpeta: "
	 	read nombre
		dir=$(echo "~/$nombre")
		cd "$(echo ~)"/"$nombre"
		mkdir "$(echo ~)"/"$nombre"
		cd "$PWD/back" && hc -c "$dir" && cd ..
	fi
fi
if [ -d "$(cat "$pathFil")" ]; then
	cd "$PWD/back" && node server.js && cd ..
fi
