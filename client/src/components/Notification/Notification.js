import $ from 'jquery';

function Notification(msg, t) {
    if (t === 1) {
        $('#notification')
            .html(
                `<div class="notification w3-panel w3-green w3-card-4">
          <h3>Success!</h3>
          <p>${msg}</p>
      </div>`
            )
            .removeClass('error')
            .addClass('success')
            .fadeIn(500)
            .delay(2000)
            .fadeOut(500)
    }

    if (t === 2) {
        $('#notification')
            .html(
                `<div class="notification w3-panel w3-red w3-card-4">
          <h3>Error!</h3>
          <p>${msg}</p>
      </div>`
            )
            .removeClass('success')
            .addClass('error')
            .fadeIn(500)
            .delay(2000)
            .fadeOut(500)
    }
}

export default Notification