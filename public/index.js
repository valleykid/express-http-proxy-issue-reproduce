import request from './request';

request('/', {
  method: 'POST',
  body: {
    username: 'abc@qqqq.com',
    password: '123'
  }
});