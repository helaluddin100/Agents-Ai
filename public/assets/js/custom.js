// Heading Typing JS
jQuery(document).ready(function(){
    jQuery('.ityped').html('');
});
setTimeout(function(){
    window.ityped.init(document.querySelector('.ityped'),{
    strings: ['LAM Agent for your Personal or Business Use Case','LAM Agent for your Personal or Business Use Case','LAM Agent for your Personal or Business Use Case'],
    loop: true
    });
},50);



// Banner Form
document.getElementById("signup-form").addEventListener("submit", function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the value of the email input field
    var email = document.getElementById("email-input").value;

    // Encode the email value to be passed in the URL
    var encodedEmail = encodeURIComponent(email);

    // Construct the URL with the email parameter
    var nextPageUrl = "https://agents.ai/en/signup?email=" + encodedEmail;

    // Redirect the user to the next page
    window.location.href = nextPageUrl;
});
