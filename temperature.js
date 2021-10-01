const output = document.getElementById( "output" );
const button = document.getElementById( "refresh" );

function run() {
  output.innerHTML = ""
  cockpit.spawn( ["cat", "/sys/class/thermal/thermal_zone0/temp"] )
         .stream( temperature => {
           output.innerText = temperature.substr( 0, 2 ) + "." + temperature.substring( 2, 3 ) + "℃"

           const numTemperature = Number.parseFloat( temperature ) / 1000
           output.className =
               numTemperature < 40 ? "alert alert-primary" :
                   numTemperature < 50 ? "alert alert-success" :
                       numTemperature < 60 ? "alert alert-warning" :
                           "alert alert-danger"
         } )
         .catch( e => {
           console.warn( e )
           output.innerText = "Error"
           output.className = "alert alert-danger"
         } );
}

button.addEventListener( "click", run )

cockpit.transport.wait( () => {
  run()
} );
