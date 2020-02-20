import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { Domain } from '../models/domain.model';


@Injectable({
  providedIn: 'root'
})
export class TemplateGeneratorService {


  constructor() { }

  getTemplate(domain: Domain) {


    const htmlTemplate = `<!DOCTYPE html><html lang="en"><head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/> <title>` + domain.name + ` |  Domain is up for sale</title> <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"> <link rel="stylesheet" href="https://firebasestorage.googleapis.com/v0/b/domain-project-51bd1.appspot.com/o/template_files%2Fstyle.css?alt=media&token=ea73602d-6c85-4e34-9071-0a30ab40a85c">
    </head><body> <div class="navbar-fixed"> <nav class="white" role="navigation"> <div class="nav-wrapper container "><a id="logo-container" href="http://namoyo.com/domain/` + domain.id + `" class="grey-text text-darken-4 custom-logo">` + domain.name + `</a> <ul class="right "> <li> <a href="mailto:support@namoyo.com?subject=inquiry about ` + domain.name + `" class="grey-text text-darken-4 "> <span class="flex-box"><i class="material-icons">mail_outline</i></span> </a> </li></ul> </div></nav> </div><div class="section no-padding primary-color" id="index-banner"> <div class="container"> <br><br><h1 class="header center white-text">` + domain.name + ` for sale</h1> <div class="row center"> <h5 class="header col s12 light white-text">Domain name is up for sale</h5> <h4 class="header col s12 white-text"><b>$` + domain.salePrice + `</b></h4> </div><div class="row center"> <a href="http://namoyo.com/domain/` + domain.id + `" id="buy-now" class="btn-large waves-effect waves-dark grey-text text-darken-4 white">Buy Now</a> </div><br><br></div></div><div class="container"> <div class="section"> <h3 class="grey-text text-darken-4 center">What you get</h3> <div class="row"> <div class="col s12 m4"> <div class="icon-block"> <h2 class="center primary-color-text"><i class="material-icons">card_giftcard</i></h2> <h5 class="center">A premium domain name</h5> <p class="light">Every business name with a .com domain name on our marketplace is curated by our branding experts.</p></div></div><div class="col s12 m4"> <div class="icon-block"> <h2 class="center primary-color-text"><i class="material-icons">color_lens</i></h2> <h5 class="center">Professionally designed logo</h5> <p class="light">Your unique business name comes with a creative logo created by a highly skilled logo designer.</p></div></div><div class="col s12 m4"> <div class="icon-block"> <h2 class="center primary-color-text"> <i class="material-icons">euro</i> </h2> <h5 class="center">Transparent pricing</h5> <p class="light">No hidden fees, no escrow fees. We guarantee your domain name delivery or your money back. </p></div></div></div></div><hr> <h6 class="grey-text text-darken-4 center light">Successful businesses have cool, recognizable brand names that customers can connect with. This name ticks all the boxes and it's available to buy immediately.</h6> <br><br><div class="row center"> <a  href="http://namoyo.com/domain/` + domain.id + `" id="buy-now
    " class="btn-large waves-effect waves-dark white-text primary-color">I want to own this name</a> </div><br><br></div><footer class="page-footer primary-color"> <div class="footer-copyright"> <div class="container"> Powered by <a class="orange-text text-lighten-3" href="http://namoyo.com">namoyo.com</a> </div></div></footer> <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script> <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script> <script src="https://firebasestorage.googleapis.com/v0/b/domain-project-51bd1.appspot.com/o/template_files%2Finit.js?alt=media&token=51078a75-a6cb-4c6c-a92d-88d566d8c124"> </script>  </body></html>`;


    var file = new File([htmlTemplate], "index.html", {
      type: "text/html;charset=utf-8",
    });

    saveAs(file);

  }
}
