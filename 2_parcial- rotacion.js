var scene = new THREE.Scene();  // Se crea la escena.

function cubo(dim, color, material, alambrado){
    var cubeGeometry=new THREE.BoxGeometry(dim,dim,dim);
    var cubeMaterial;

    switch(material){
     case 'Basic': cubeMaterial = new THREE.MeshBasicMaterial({color: color, wireframe: alambrado});
      break;

     case 'Standard': cubeMaterial = new THREE.MeshStandardMaterial({color: color, wireframe: alambrado});
      break;

     case 'Physical': cubeMaterial = new THREE.MeshPhysicalMaterial({color: color, wireframe: alambrado});
      break;

     case 'Phong': cubeMaterial = new THREE.MeshPhongMaterial({color: color, wireframe: alambrado});
      break;

     case 'Lambert': cubeMaterial = new THREE.MeshLambertMaterial({color: color, wireframe: alambrado});
      break;
    }
    
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    // add the cube to the scene
    scene.add(cube);
    return(cube);
}
function init() {
   
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);  //Se crea la camara.
    
    var renderer = new THREE.WebGLRenderer();			// Se crea el render
    renderer.setClearColor(new THREE.Color(0x000000));							
    renderer.setSize(window.innerWidth, window.innerHeight);

    var axes = new THREE.AxesHelper(20);  //Se muestran los ejes.
    scene.add(axes);

    Cubo = [];   	// Definir un array unidimensional.
    dim=4;        	// Definir las dimensiones de los cubos.
    var con=dim/2;
    
for(var i=0;i<3;i++){
    var c;
    if(i==0){
        c=0xFFDD00;
    }else if(i==1){     //Se crean los 3 cubos.
       c=0xFF0000; 
    }else if(i==2){
        c=0xE633FF
    }
   
    Cubo.push(cubo(dim, c, 'Basic', false));
    Cubo[i].position.set(0, 0, 0);                  //se ubican los cubos en el origen.
    
}

for(var i=0;i<3;i++){
    h= Math.sqrt(Math.pow(dim,2)+ Math.pow(dim,2));
    l=dim-h;
    an= (45 * Math.PI)/180;
    if(i==0){

        Cubo[i].translateY(con);	//Se tiene el primer cubo y se aplica la traslacion
	Cubo[i].rotateY(an);	        //Se aplica la rotacion.

    }else if(i==1){

       Cubo[i].translateY(con+dim); 
       Cubo[i].scale.set(dim/(dim*2),dim/(dim*2),dim/(dim*2));		//Se tiene el segundo cubo y se aplica la traslacion y escalado
       Cubo[i].position.set(0, 0, 0); 
       Cubo[i].translateY((con+dim)-1); 

    }else if(i==2){

        Cubo[i].translateY((2*dim)+con);
	Cubo[i].scale.set(dim/(dim*4),dim/(dim*4),dim/(dim*4));		//Se tiene el tercer cubo y se aplica la traslacion y escalado
	Cubo[i].position.set(0.8, 0, 2);
	Cubo[i].translateY((con+dim)+dim/(dim*2));
	Cubo[i].rotateY(an);						//Se aplica la rotacion.
    }
	Cubo[i].translateX(con);	//se trasladan todos los cubos en x
}
	
   //Luz (requerida para el material MeshLambertMaterial)
    light = new THREE.PointLight(0xFFFF00); //  Luz proveniente de un punto en el espacio, 
		                            //  semejante al sol.
    light.position.set( -10, 10, 10 );             //  Localización de la luz. (x, y, z).
    scene.add( light ); 

    // position and point the camera to the center of the scene
    camera.position.set(3*dim, 3*dim, 5*dim);  //Posicion de la camara.
    camera.lookAt(scene.position);

    // add the output of the renderer to the html element
    document.getElementById("webgl-output").appendChild(renderer.domElement);

    // render the scene
    renderer.render(scene, camera);
}

