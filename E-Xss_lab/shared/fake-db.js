// Fake DB using localStorage for stored XSS levels
const FakeDB = {
  get(key){
    try{return JSON.parse(localStorage.getItem('fakedb_'+key)||'[]')}catch(e){return []}
  },
  set(key,val){localStorage.setItem('fakedb_'+key,JSON.stringify(val))},
  push(key,item){
    const arr=this.get(key);arr.push(item);this.set(key,arr);
  },
  clear(key){localStorage.removeItem('fakedb_'+key)}
};