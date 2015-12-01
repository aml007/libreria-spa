(function(window, document){
	'use strict';

	var consecutivo = 0;
	_.controlador('contacto', {

		contacto: {},
		contactos: [],

		crear: function(formulario){
			this.contacto.nombre = formulario.nombre.value;
			this.contacto.correo = formulario.correo.value;
			this.contacto.edad = parseInt(formulario.edad.value, 10);
			this.contacto.nacimiento = formulario.nacimiento.value;
			this.contacto.recibir = formulario.recibir.checked;
			this.contacto.color = formulario.color.value;
			consecutivo = consecutivo + 1;
			this.contacto.identificador = consecutivo;
			this.contactos.push(this.contacto);
			this.contacto = {};
			alert("Contacto creado con el id: "+consecutivo);
			formulario.reset();
		},


		eliminar: function(id){
			var i = 0, max = this.contactos.length;
			if(confirm("Desea eliminar el contacto?")){
				for(; i < max; i = i + 1){
					if(parseInt(id, 10) === this.contactos[i].identificador){
						this.contactos.splice(i, 1);
						break;
					}
				}
				this.listar();
			}
		},

		actualizar: function(){},

		listar: function(){
			var cuerpo   = _.get('cuerpoTabla'),
			    template = _.get('fila'),
			    fragmento = document.createDocumentFragment(),
			    i = 0,
			    max = this.contactos.length,
			    registro, clon, id, nombre, correo,
			    edad, nacimiento, acepta, color,
			    acciones, eliminar, actualizar,
			    self = this;

			cuerpo.innerHTML = '';
			for(; i < max; i = i + 1){
				registro = self.contactos[i];

				clon     = template.content.cloneNode(true);
				id       = clon.querySelector('.identificador');
				nombre   = clon.querySelector('.nombre');
				correo   = clon.querySelector('.correo');
				edad     = clon.querySelector('.edad');
				nacimiento = clon.querySelector('.nacimiento');
				acepta   = clon.querySelector('.acepta');
				color    = clon.querySelector('.color');

				// Acciones de eliminar y actualizar
				acciones = clon.querySelector('.acciones');
				eliminar = acciones.querySelector('.eliminar');
				actualizar = acciones.querySelector('.actualizar');

				eliminar.dataset.id = registro.identificador;
				eliminar.addEventListener('click', function(e){
					e.preventDefault();
					self.eliminar(e.target.dataset.id);
				}, false);

				actualizar.dataset.id = registro.identificador;
				actualizar.addEventListener('click', function(e){
					e.preventDefault();
					self.confirmaActualizar(e.target.dataset.id);
				}, false);

				id.textContent     = registro.identificador;
				nombre.textContent = registro.nombre;
				correo.textContent = registro.correo;
				edad.textContent   = registro.edad;
				nacimiento.textContent = registro.nacimiento;
				acepta.textContent = registro.recibir?'Si':'No';
				color.textContent  = registro.color;

				fragmento.appendChild(clon);
			}
			cuerpo.appendChild(fragmento);
		}

	});
})(window, document);