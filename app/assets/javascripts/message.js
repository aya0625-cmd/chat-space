$(function(){ 
  function buildHTML(message) { 
    image = (message.image) ? `<img class= "chat-main__message__image" src=${message.image} >` : "";
     var html =
      `<div class="chat-main__message" data-message-id="${message.id}">
         <div class="chat-main__message__data">
           <p class="chat-main__message__data__name">
             ${message.user_name}
           </p>
           <p class="chat-main__message__data__date">
             ${message.created_at}
           </p>
         </div>
         <div class="chat-main__messages">
           <p class="chat-main__messages__text">
             ${message.text}
           </p>
           ${image}
         </div>
       </div>`
      return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $('.submit-btn').removeAttr('data-disable-with');
      $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){  
        var html = buildHTML(data);
        $('.chat-main__center').append(html); 
        $('.chat-main__center').animate({ scrollTop: $('.chat-main__center')[0].scrollHeight});   
        $('form')[0].reset()
      })
      .fail(function(){
        alert('メッセージ送信に失敗しました');
      });
      return false;
  });
 
  var reloadMessages = function() {
    last_message_id = $('.chat-main__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML = buildHTML(message)
        });
        $('.chat-main__center').append(insertHTML);
        $('.chat-main__center').animate({ scrollTop: $('.chat-main__center')[0].scrollHeight});
        $("#new_message")[0].reset();
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});