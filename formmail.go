package bin

import (
    "fmt"
    "net/http"
    netMail "net/mail"
    "appengine"
    "appengine/mail"
)

func contact(w http.ResponseWriter, r *http.Request) {
    c := appengine.NewContext(r)
    name := r.FormValue("name")
    email := r.FormValue("email")
    subject := r.FormValue("subject")
    message := r.FormValue("message")
		msg := &mail.Message{
		        Sender:  name + " <developer@netscoutdemo.appspot.com>",
		        To:      []string{"fighne@gmail.com"},
		        Subject: subject,
		        Body:    message,
		        Headers: netMail.Header{
		            "On-Behalf-Of": []string{email},
		        },
		}
    if err := mail.Send(c, msg); err != nil {
        c.Errorf("Couldn't send email: %v", err)
        fmt.Fprint(w, "Mail NOT send! Error")
    }else{
        fmt.Fprint(w, "Mail send.")
    }
}