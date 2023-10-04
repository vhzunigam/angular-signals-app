import { Component, OnDestroy, OnInit, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css']
})
export class PropertiesPageComponent implements OnDestroy, OnInit {
  public counter = signal(10);

  public user = signal<User>({
    id: 3,
    email: "emma.wong@reqres.in",
    first_name: "Emma",
    last_name: "Wong",
    avatar: "https://reqres.in/img/faces/3-image.jpg"
  });

  public userChangedEffect = effect(() => {
    console.log(`${this.user().first_name} ${this.counter()}`);
  });

  ngOnInit(): void {
    setInterval(() => {
      this.counter.update(current => current + 1);

      if(this.counter() == 15)
        this.userChangedEffect.destroy();
    }, 1000);
  }

  onFieldUpdate(field: keyof User, value: string) {
    this.user.mutate(current => {

      switch (field) {
        case 'email':
          current.email = value;
          break;
        case 'first_name':
          current.first_name = value;
          break;
        case 'last_name':
          current.last_name = value;
          break;
        case 'id':
          current.id = Number(value);
          break;
      }

    });
  }

  increaseBy(value: number): void {
    this.counter.update(current => current + value);
  }

  ngOnDestroy(): void {
  }

}
