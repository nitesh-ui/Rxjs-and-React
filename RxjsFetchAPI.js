import { of, switchMap, map } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

const data = fromFetch('https://jsonplaceholder.typicode.com/users').pipe(
  switchMap((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return of({ error: true, message: `Error ${response.status}` });
    }
  }),
  map((users) => {
    return users.map((user) => user.name);
  })
);

data.subscribe({
  next: (result) => console.log(result),
  complete: () => console.log('done'),
});
