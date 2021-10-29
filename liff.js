$(document).ready(function () {
    // liffId: LIFF URL "https://liff.line.me/xxx"のxxxに該当する箇所
    // LINE DevelopersのLIFF画面より確認可能
    var liffId = "1656567556-GW67e4wB";
    initializeLiff(liffId);
})

function initializeLiff(liffId) {
    liff
        .init({
            liffId: liffId
        })
        .then(() => {
            // Webブラウザからアクセスされた場合は、LINEにログインする
            if (!liff.isInClient() && !liff.isLoggedIn()) {
                window.alert("LINEアカウントにログインしてください。");
                liff.login({redirectUri: location.href});
            }
        })
        .catch((err) => {
            console.log('LIFF Initialization failed ', err);
        });
}

function sendText(text) {
    if (!liff.isInClient()) {
        shareTargetPicker(text);
    } else {
        sendMessages("見積もり申し込み"); /////////文言「見積もり申し込み」の送信は成功したが、Gmailへの転送が成功しない。
        //sendGmail();
        sendautomail();
        sendMessages(text);
    }
}

// LINEトーク画面上でメッセージ送信
function sendMessages(text) {
    liff.sendMessages([{
        'type': 'text',
        'text': text
    }]).then(function () {
        liff.closeWindow();
    }).catch(function (error) {
        window.alert('Failed to send message ' + error);
    });
}

// Webブラウザからメッセージ送信
function shareTargetPicker(text) {
    liff.shareTargetPicker([{
        'type': 'text',
        'text': text
    }]).catch(function (error) {
        window.alert('Failed to send message ' + error);
    });
}



//Email送付実験。記載がおかしい場合は以下を削除する。→多分これは機能していない。
function sendGmail() {
  //「index.html」ファイルの中身を取得
  var html = HtmlService.createHtmlOutputFromFile("index").getContent();
  
  MailApp.sendEmail({
    to: 'biz.shotanabe@gmail.com', //宛先メールアドレスを指定
    subject: '件名TEST', //件名を指定
    name: 'LINEチャット自動転送', //差出人名を指定
    //テキストパートの本文を記述
    body: 'LINEチャット自動転送\n\nLINEチャット自動転送\n\nLINEチャット自動転送\nLINEチャット自動転送\n\nLINEチャット自動転送\n\n=============================\n',
    //HTMLパートの本文を指定 
    htmlBody: html 
  });
}



//Email送信実験２
function sendautomail(){
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "lpg.switching@gmail.com",
        Password : "B1B77086CF542475B41E41582E7D1B36E78D",
        To : 'lpg.switching@gmail.com',
        From : "lpg.switching@gmail.com",
        Subject : "ガス見積もりの申し込みがありました。",
        Body : "ガス見積もりの申し込みがありました。"
    }).then(
        message => alert(message)
    )
};
