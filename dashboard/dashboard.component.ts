import { Component, OnInit, Output } from "@angular/core";
import { RegisterComponent } from "../register/register.component";
import { ValidateService } from "../services/validate.service";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";
import { Product, Service } from "../services/products.service";
import { NgModule, enableProdMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn,
} from "@angular/forms";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  animations: [
    trigger("openClose", [
      // ...
      state(
        "open",
        style({
          height: "200px",
          opacity: 1,
          backgroundColor: "yellow",
        })
      ),
      state(
        "closed",
        style({
          height: "100px",
          opacity: 0.5,
          backgroundColor: "green",
        })
      ),
      transition("open => closed", [animate("1s")]),
      transition("closed => open", [animate("0.5s")]),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  currentUser: Observable<any>;

  form: FormGroup;
  isOpen = true;
  isShow = false;


  constructor(private validateService: ValidateService,
              private authService: AuthService,
              private service: Service,
              private product: Product,
              private formBuilder: FormBuilder,
              public http : HttpClient
    ) {
      this.form = this.formBuilder.group({
        orders: ['']
      });
      this.currentUser = authService.user;
      this.http = http;
      //this.products = this.service.getProducts();
      
     
    }
    test(){
      console.log(this);
    }


  ngAfterViewInit() {
    //this.delete(null);
    //this.test();
    //console.log("here");
    console.log(this.http);
    //let element: HTMLInputElement;
    //element = document.getElementById("search") as HTMLInputElement;
    //element.addEventListener('keyup',this.rebuildList);
    console.log(
      this.update(
        "5e55998383b9570017353a92",
        '{ "ID":"1","Name":"Pizza","Price":"10","currentInventory":"0","urlString":"pepperonipizza"}'
      )
    );
    var promise = this.getPromise();
    promise.then((data) => {
      var array = [];
      for (let i in data) {
        //console.log(i);

        array[i] = data[i];
      }
      // console.log("here");
      //console.log(array[0]);
      //JSON.parse(array[0]);
      //console.log("HERE");
      //console.log(array[0].ID);
      this.createList(array, null);
      this.createViews(array);
    });
  }

  async getPromise() {
    var array = [];
    var thing = await this.http
      .get("https://secret-ravine-06895.herokuapp.com/api/products")
      .toPromise()
      .then((data) => {
        for (let i in data) {
          //console.log(i);

          array[i] = data[i];
        }
      });
    return array;
  }

  update(id, data) {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    //data = JSON.parse(data);
    console.log(data);
    const url = "https://secret-ravine-06895.herokuapp.com/api/products/" + id;
    console.log(url);
    return this.http.put(url, data, httpOptions);
  }

  delete(evt) {
    //console.log("HERE");
    var http2 = HttpClient;
    console.log(http2);
    console.log(HttpClient);
    const url = "https://secret-ravine-06895.herokuapp.com/api/product/name/" + evt.toElement.name;
    console.log(url);
    //console.log(this.http.delete(url));
    //this.test();
    this.rebuildList();
  }

  public rebuildList() {
    let element = document.getElementById("search") as HTMLInputElement;

    var promise = this.getPromise();
    promise.then((data) => {
      var array = [];
      for (let i in data) {
        //console.log(i);

        array[i] = data[i];
      }
      //console.log("here");
      //console.log(array[0]);
      //JSON.parse(array[0]);
      //console.log("HERE");
      //console.log(array[0].ID);
      this.createList(array, element.value);
      this.createViews(array);
    });
  }

  

  createList(array, search) {
    var output;
    let element;
    // //console.log(search);
    if (search == null) {
      output = '<ul style="margin-top:25px" _ngcontent-doi-c3="" class="ng-tns-c3-0">';
      array.forEach((product) => {
        output +=
          '<ul style:"left:0px" _ngcontent-doi-c3="" class="list-group ng-tns-c3-0 ng-star-inserted"><li _ngcontent-doi-c3="" class="list-group-item d-flex justify-content-between align-items-center"><td _ngcontent-doi-c3="" class="ng-tns-c3-0">' +
          product.Name +
          '</td><button style:"" _ngcontent-doi-c3="" class="btn btn-primary" id="' +
          product.Name +
          '">view</button><span _ngcontent-doi-c3="" class="badge badge-primary badge-pill"><td _ngcontent-doi-c3="" class="ng-tns-c3-0">' +
           '$' + product.Price +
          '</td></span></li><iframe _ngcontent-doi-c3="" class="ng-tns-c3-0" src="https://peaceful-eyrie-71046.herokuapp.com/?name=' +
          product.urlString +
          '" style="display: none;" id="' +
          product.ID +
          '"></iframe></ul>';
      });

      //element.value = "here";
    } else {
      output = '<ul _ngcontent-doi-c3="" class="ng-tns-c3-0" style="margin-top:25px">';
      array.forEach((product) => {
        if (product.Name.includes(search)) {
          output +=
            '<ul _ngcontent-doi-c3="" class="list-group ng-tns-c3-0 ng-star-inserted"><li _ngcontent-doi-c3="" class="list-group-item d-flex justify-content-between align-items-center"><td _ngcontent-doi-c3="" class="ng-tns-c3-0">' +
            product.Name +
            '</td><button _ngcontent-doi-c3="" class="btn btn-primary" id="' +
            product.Name +
            '">view</button><span _ngcontent-doi-c3="" class="badge badge-primary badge-pill"><td _ngcontent-doi-c3="" class="ng-tns-c3-0">' +
            '$' + product.Price +
            '</td></span></li><iframe _ngcontent-doi-c3="" class="ng-tns-c3-0" src="https://peaceful-eyrie-71046.herokuapp.com/?name=' +
            product.urlString +
            '" style="display: none;" id="' +
            product.ID +
            '"></iframe></ul>';
        }
      });
    }
    output += "</ul>";
    element = document.getElementById("listcontainer") as HTMLElement;
    //console.log(output);
    element.innerHTML = output;
  }
  createViews(array) {
    let element: HTMLFormElement;
    array.forEach(product => {
    element = document.getElementById(product.Name) as HTMLFormElement;
    if(document.getElementById(String(product.ID)) as HTMLFormElement != null)
    {
      const iframe = document.getElementById(String(product.ID)) as HTMLFormElement;
      iframe.src = 'https://peaceful-eyrie-71046.herokuapp.com/?name=' + product.urlString;
      element.addEventListener('click', function() {
      const element = document.getElementById(String(product.ID)) as HTMLFormElement;
      if (element.style.display === 'none') {
          element.style.display = 'block';
        } else {
          element.style.display = 'none';
        }
      });
     
    }
    if(document.getElementById(String(product.ID + 'delete')) != null){
      
      const element2 = document.getElementById(String(product.ID + 'delete'));
      element2.addEventListener('click',this.delete);
    }
    
  });
  }

  ngOnInit() {}

  view() {
    this.ngAfterViewInit();
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  profile() {
    this.authService.profile();
  }

  addItem() {
    this.service.addProduct();
  }

  uploadFile($event) {
    console.log($event.target.files[0]); // outputs the first file
  }
  toggleDisplay() {
    this.isShow = !this.isShow;
  }
}

