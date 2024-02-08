

document.getElementById('element1').textContent = 'Nouveau texte pour l\'élément 1';


document.querySelector('.image').src = '"D:\MAHDI\Downloads\sasuke.jpg"';


var elements = document.querySelectorAll('.element2');
elements.forEach(function(element) {
    element.style.backgroundColor = 'lightblue';
});


var newElement = document.createElement('p');
newElement.textContent = 'Nouvel élément ajouté';
document.body.appendChild(newElement);


var elementToRemove = document.getElementById('elementToRemove');
elementToRemove.parentNode.removeChild(elementToRemove);
