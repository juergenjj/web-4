let enlaces = document.querySelectorAll(".navbar-nav li a");

enlaces.forEach((element) => {
  element.addEventListener("click", (event) => {
    enlaces.forEach((link) => {
      link.classList.remove("active");
    });

    event.target.classList.add("active");
  });
});

$(".navbar-collapse a").click(function () {
  $(".navbar-collapse").collapse("hide");
});




function calcularResultados() {
  var altura = parseFloat(document.getElementById("altura").value);
  var peso = parseFloat(document.getElementById("peso").value);
  var cintura = parseFloat(document.getElementById("cintura").value);
  var cuello = parseFloat(document.getElementById("cuello").value);
  var cadera = parseFloat(document.getElementById("cadera").value);
  var sexo = document.getElementById("sexo").value;
  var actividad = document.getElementById("actividad").value;
  var aguaTomar = 0;

  if (isNaN(altura) || isNaN(peso) || isNaN(cintura) || isNaN(cuello)) {
    document.getElementById("resultado").innerHTML =
      "Por favor ingrese valores válidos.";
    return;
  }

  var imc = peso / (altura / 100) ** 2;
  var porcentajeGrasa = 0;
  var masaCorporalMagra = 0;

  if (sexo === "hombre") {
    porcentajeGrasa =
      495 /
        (1.0324 -
          0.19077 * Math.log10(cintura - cuello) +
          0.15456 * Math.log10(altura)) -
      450;
  } else if (sexo === "mujer" && !isNaN(cadera)) {
    porcentajeGrasa =
      495 /
        (1.29579 -
          0.35004 * Math.log10(cintura + cadera - cuello) +
          0.221 * Math.log10(altura)) -
      450;
  } else {
    document.getElementById("resultado").innerHTML =
      "Por favor ingrese valores válidos.";
    return;
  }
  masaCorporalMagra = peso * (1 - porcentajeGrasa / 100);

  if (actividad === "sedentario") {
    aguaTomar = peso * 30;
  } else if (actividad === "moderado") {
    aguaTomar = peso * 35;
  } else if (actividad === "activo") {
    aguaTomar = peso * 40;
  }

  if (isNaN(porcentajeGrasa) || isNaN(masaCorporalMagra)) {
    document.getElementById("resultado").innerHTML =
      "No se pudieron calcular los resultados.";
  } else {
    document.getElementById("resultado").innerHTML =
      "Índice de Masa Corporal (IMC): " +
      imc.toFixed(2) +
      "<br>" +
      "Porcentaje de Grasa Corporal: " +
      porcentajeGrasa.toFixed(2) +
      "%<br>" +
      "Masa Corporal Magra: " +
      masaCorporalMagra.toFixed(2) +
      " kg" +
      "%<br>" +
      "Agua a tomar: " +
      aguaTomar.toFixed(2) +
      " ml";
  }
}


document.addEventListener("DOMContentLoaded", function () {
  var bar1 = document.getElementById("bar1");
  var bar2 = document.getElementById("bar2");
  var bar3 = document.getElementById("bar3");
  
  fillBar(bar1, "#ffffff", 2000);
  fillBar(bar2, "#ffffff", 2000);
  fillBar(bar3, "#ffffff", 2000);

  var tableControls = document.querySelectorAll(".table-controls ul li");
  tableControls.forEach(function (control) {
    control.addEventListener("click", function () {
      var tsfilter = this.getAttribute("data-tsfilter");
      tableControls.forEach(function (item) {
        item.classList.remove("active");
      });
      this.classList.add("active");

      var classTimetables = document.querySelectorAll(".class-timetable");
      var tsMetaItems = document.querySelectorAll(".ts-meta");

      if (tsfilter == "all") {
        classTimetables.forEach(function (timetable) {
          timetable.classList.remove("filtering");
        });
        tsMetaItems.forEach(function (meta) {
          meta.classList.remove("show");
        });
      } else {
        classTimetables.forEach(function (timetable) {
          timetable.classList.add("filtering");
        });
      }

      tsMetaItems.forEach(function (meta) {
        meta.classList.remove("show");
        if (meta.getAttribute("data-tsmeta") == tsfilter) {
          meta.classList.add("show");
        }
      });
    });
  });
});


function fillBar(bar, color, duration) {
  var fillElement = bar.querySelector(".fill");
  var percentage = parseFloat(fillElement.getAttribute("data-percentage"));

  var width = 0;
  var targetWidth = (bar.offsetWidth / 100) * percentage;
  var increment = targetWidth / (duration / 10);

  var intervalId = setInterval(function () {
    if (width >= targetWidth) {
      clearInterval(intervalId);
    } else {
      width += increment;
      fillElement.style.width = width + "px";
      fillElement.style.backgroundColor = color;
    }
  }, 10);
}

document.addEventListener("DOMContentLoaded", function () {
  var bar1 = document.getElementById("bar1");
  var bar2 = document.getElementById("bar2");
  var bar3 = document.getElementById("bar3");

  fillBar(bar1, "#ffffff", 2000);
  fillBar(bar2, "#ffffff", 2000);
  fillBar(bar3, "#ffffff", 2000);
});
