function startPresentation() {
	element = document.getElementById('slide-boundaries')
  element
    .requestFullscreen()
    .then(function () {
      // element has entered fullscreen mode successfully
    })
    .catch(function (error) {
      // element could not enter fullscreen mode
      // error message
      console.log(error.message);
    });
}
