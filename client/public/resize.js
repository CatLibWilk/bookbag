var resizable = document.querySelector('.resizable'),
    resizer = document.querySelector( '.resizer' ),
    startX, startY, startWidth, startHeight;
    
resizer.addEventListener( 'mousedown', initDrag, false );

function initDrag( e ) {
   startX = e.clientX;
   startY = e.clientY;
   startWidth = parseInt( document.defaultView.getComputedStyle( resizable ).width, 10);
   startHeight = parseInt(document.defaultView.getComputedStyle( resizable ).height, 10);
   resizer.addEventListener('mousemove', doDrag, false);
   resizer.addEventListener('mouseup', stopDrag, false);
}

function doDrag(e) {
   resizable.style.width = (startWidth + e.clientX - startX) + 'px';
   resizable.style.height = (startHeight + e.clientY - startY) + 'px';
}

function stopDrag(e) {
    document.documentElement.removeEventListener('mousemove', doDrag, false);    
    document.documentElement.removeEventListener('mouseup', stopDrag, false);
}
