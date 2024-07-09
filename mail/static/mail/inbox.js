document.addEventListener('DOMContentLoaded', function() {
    // Use buttons to toggle between views
    document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
    document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
    document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
    document.querySelector('#compose').addEventListener('click', compose_email);
    document.querySelector('#archbutton').addEventListener('click',archived)
    document.querySelector('#reply').addEventListener('click', function(){
      
      replyOn()
    })
    // By default, load the inbox
    load_mailbox('inbox');
    
    // SUBMITTING THE FORM FOR SENDING
    document.querySelector("#compose-form").onsubmit = function(){
        const arr = document.querySelector('#compose-recipients').value;
        const sub = document.querySelector('#compose-subject').value;
        const bod = document.querySelector('#compose-body').value;
        fetch('/emails', {
            method: 'POST',
            body: JSON.stringify({
                recipients: `${arr}`,
                subject: `${sub}`,
                body: `${bod}`
            })
          })
          .then(response => response.json())
          .then(result => {
              // Print result
              
              load_mailbox('sent')
        });
        return false;
    }



  function compose_email() {
    // Show compose view and hide other views
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'block';
    document.querySelector('#emailView').style.display = 'none';
    
    // Clear out composition fields
    document.querySelector('#compose-recipients').value = '';
    document.querySelector('#compose-subject').value = '';
    document.querySelector('#compose-body').value = '';
  }
  


  function load_mailbox(mailbox) {
    // Show the mailbox and hide other views
    document.querySelector('#emails-view').style.display = 'block';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#emailView').style.display = 'none';
    // Show the mailbox name
    document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
    fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(emails => {
    // Print emails
      display(emails)
    // ... do something else with emails ...
    });
  }

  
//DISPLAY LIST OF EMAILS IN INBOX, SENT ARCHIVED
  function display(emails){
    
    for (let index = 0; index < emails.length; index++) {
      const list = document.createElement('div');
      const block = document.createElement('div');
      block.className = "myblock"
      list.style.color = "black";
      list.className = "d-flex justify-content-between";
      list.style.backgroundColor = "white";
      list.style.border = "2px solid black"
      list.style.padding = "5px"
      if(emails[index].read == true){
        list.style.backgroundColor = "grey";
      }
      const div1 = document.createElement("div")
      div1.innerHTML = emails[index].sender;
      div1.id = emails[index].id;
      const div2 = document.createElement("div")
      div2.innerHTML = emails[index].subject;
      const div3 = document.createElement("div")
      div3.innerHTML = emails[index].timestamp;
      div1.style.fontWeight="bold"
      list.appendChild(div1)
      list.appendChild(div2)
      list.appendChild(div3)
      block.appendChild(list)
      document.querySelector('#emails-view').appendChild(block)
    }
    var el = document.querySelectorAll('.myblock')
    listen(el)
  }


  // ADD EVENT LISTENER TO ALL THE EMAILS IN THE LIST
  function listen(el){
    el.forEach(box => {
      box.addEventListener('click', function handleClick(event) {
        viewEmails(box.children[0].children[0].id);
        readen(box.children[0].children[0].id)
      });
    });
  }
  

  //MARK EMAILS READ
  function readen(emailid){
    fetch(`/emails/${emailid}`, {
      method: 'PUT',
      body: JSON.stringify({
          read : true
      })
    })
  }

  //MARK EMAILS ARCHIVED
  function archived(){
    const to = document.querySelector('#To')
    const from = document.querySelector('#From')
    istrue = to.className;
    emailid = from.className;
  
    var value;
    const butt = document.querySelector('#archbutton');
      if(istrue == 'true'){
          butt.innerHTML = "Archive"
          value = false
      }else{
          butt.innerHTML = "Unarchive"
          value = true;
      }
      
    fetch(`/emails/${emailid}`, {
      method: 'PUT',
      body: JSON.stringify({
          archived : value
      })
    }).then(function(){
      load_mailbox('inbox');
    })
  }

  //SENDING REPLIES
  function replyOn(email){
        // Show compose view and hide other views
        document.querySelector('#emails-view').style.display = 'none';
        document.querySelector('#compose-view').style.display = 'block';
        document.querySelector('#emailView').style.display = 'none';

        //extracting values
        const from = document.querySelector('#From')
        const to = document.querySelector('#To')
        const emailsubject = document.querySelector('#Subject')
        const emailtimestamp = document.querySelector('#Timestamp')
        const emailbody = document.querySelector('#Body')
        
        // Clear out composition fields
        document.querySelector('#compose-recipients').value = from.innerHTML;
        var x = emailsubject.innerHTML.split(':');
        console.log(x[0])
        var subject = emailsubject.innerHTML;
        if(x[0] != "Re"){
          subject = `Re: ${emailsubject.innerHTML}`
        }
        document.querySelector('#compose-subject').value = subject;
        document.querySelector('#compose-body').value = `On ${emailtimestamp.innerHTML} ${from.innerHTML} wrote: ${emailbody.innerHTML}`;
  }


  //FETCH EMAIL FOR VIEWING EMAILS LARGER
  function viewEmails(emailid){
    fetch(`/emails/${emailid}`)
    .then(response => response.json())
    .then(email => {
    // Print email
    displayEmail(email)
    });
  }


  // FUNCTION FOR VIEWING EMAILS LARGER
  function displayEmail(email){

    // document.querySelector('#archbutton').removeEventListener('click', () => archived(email.archived, email.id))
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#emailView').style.display = 'block';
    document.querySelector('#archieve').style.display = "none";
    
    //from :
    const from = document.querySelector('#From')
    from.innerHTML = email.sender
    from.className = email.id;
    
    //Recipients 
    let isInbox = false;
    reciever = ""
    for (let index = 0; index < email.recipients.length; index++) {
      if(email.recipients[index] == document.querySelector('#myemail').innerHTML){
        isInbox = true;
      }
      reciever += `${email.recipients[index]}, `;
    }

    // Achive
    if(isInbox==true){
      document.querySelector('#archieve').style.display = "block";
      const butt = document.querySelector('#archbutton');
      if(email.archived == true){
          butt.innerHTML = "Unarchive"
          
      }else{
          butt.innerHTML = "Archive"
           
      }
      
    }
    const to = document.querySelector('#To')
    to.innerHTML = reciever
    to.className = email.archived;

    const subject = document.querySelector('#Subject')
    subject.innerHTML =email.subject
    
    const timestamp = document.querySelector('#Timestamp');
    timestamp.innerHTML = email.timestamp
    
    const body = document.querySelector('#Body');
    body.innerHTML = email.body
  }
});