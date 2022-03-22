# Project
## Crypto Tracker
1. Use Package
  - React.js
  - Typescript
  - Recoil
  - React Query
  - Styled Components
  - Apex Charts

## To Do List
1. Use Package
  - React.js
  - Typescript
  - Styled Components
  - React Hook Form

# Styled-Components

### 사용 예)

```jsx
import styled from 'styled-components';

const Father = styled.div`
  display: flex;
`;

const BoxOne = styled.div`
  background-color: teal;
  width: 100px;
  height: 100px;
`;

const BoxTwo = styled.div`
  background-color: tomato;
  width: 100px;
  height: 100px;
`;

const Text = styled.span`
  color: white;
`;

function App() {
  return (
    <Father>
      <BoxOne>
        <Text>Hello</Text>
      </BoxOne>
      <BoxTwo />
    </Father>
  );
}

export default App;
```

## ****'As' and Attrs****

- as: 태그를 변경하고자 할 때 사용하는 옵션
- Attrs: 그 외 기본적인 태그 옵션들을 사용할 수 있음.

```jsx
const Btn = styled.button`
  color: wheat;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`;

function App() {
  return (
    <Father>
      <Btn>Log in</Btn>
      <Btn as="a" href="/">Log in</Btn>
    </Father>
  );
}
```

![example](/images/'as'-and-attrs-1.png)

### 속성값 설정

```jsx
const Input = styled.input.attrs({required: true, minLength: 10})`
  background-color: tomato;
`;

function App() {
  return (
    <Father>
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
    </Father>
  );
}
```

![example](/images/property-value-setting-1%20.png)

## ****Animations and Pseudo Selectors****

### 애니메이션 사용법

```jsx
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

const rotationAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50% {
    border-radius: 100px;
  }
  100% {
    transform: rotate(360deg);
    border-radius: 0px;
  }
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  animation: ${rotationAnimation} 1s linear infinite; // string interpolation
`;

function App() {
  return (
    <Wrapper>
      <Box />
    </Wrapper>
  );
}

export default App;
```

### 하위 요소에 스타일 주기

```jsx
const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnimation} 1s linear infinite; // string interpolation
  span {
    font-size: 36px;
    &:hover {
      // case 1 ...      
    }
  }
  span:hover {
    // case 2 ...
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <span>🤩</span>
      </Box>
    </Wrapper>
  );
}
```

### 하위 요소에 스타일 주기2

```jsx
const Emoji = styled.span`
  font-size: 36px;
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnimation} 1s linear infinite; // string interpolation
  ${Emoji} {
    &:hover {
      font-size: 98px;
    }
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji as="p">🤩</Emoji>
      </Box>
    </Wrapper>
  );
}
```

## ****Themes****

### 테마 적용 기본

```jsx
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';

const darkTheme = {
  textColor: 'whitesmoke',
  backgroundColor: '#111',
};

const lightTheme = {
  textColor: '#111',
  backgroundColor: 'whitesmoke',
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

위 theme의 값이 darkTheme이냐 lightTheme에 따라서 하위가 받는 props의 값이 바뀌게 된다.

```jsx
import styled from 'styled-components';

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.backgroundColor};
`;

function App() {
  return (
    <Wrapper>
      <Title>Hello</Title>
    </Wrapper>
  );
}

export default App;
```

# React Query

React에서 비동기 로직을 쉽게 다루게 해주는 라이브러리

⇒ 사용법을 보면서, Apollo Client(GraphQL)의 useQuery와 유사하다고 느껴서 친숙했다.

## 사용 예)

1. `fetch` 함수를 사용해서 API를 미리 작성
    
    ```tsx
    const BASE_URL = 'https://api.coinpaprika.com/v1';
    
    export function fetchCoins() {
      return fetch(`${BASE_URL}/coins`).then((response => response.json()));
    }
    
    export function fetchCoinInfo(coinId: string) {
      return fetch(`${BASE_URL}/coins/${coinId}`).then((response => response.json()));
    }
    
    export function fetchCoinTickers(coinId: string) {
      return fetch(`${BASE_URL}/tickers/${coinId}`).then((response => response.json()));
    }
    
    export function fetchCoinHistory(coinId: string) {
      const endDate = Math.floor(Date.now() / 1000);
      const startDate = endDate - 60 * 60 * 24 * 7;
      return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`).then((response => response.json()));
    }
    ```
    
2. API를 사용할 위치에서 `useQuery`를 사용
    
    : Apollo Client의 `useQuery`와 사용법이 많이 유사하다.
    
    ```tsx
    import { useQuery } from 'react-query';
    import { fetchCoinInfo, fetchCoinTickers } from '../api';
    
    ...
    
    function Coin() {
    	
      ...	
    
      const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(['info', coinId], () =>
        fetchCoinInfo(coinId)
      );
      const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
        ['tickers', coinId],
        () => fetchCoinTickers(coinId),
        {
          refetchInterval: 5000,
        }
      );
    ```
    

# Recoil

React를 위한 상태관리 라이브러리

⇒ 사용법을 보면서, Apollo Client의 상태관리 기능과 유사하다고 느꼈다.

## 사용 예)

1. Atom 작성
    
    : Apollo Client의 `makeVar()`와 유사한 것 같다.
    
    ```tsx
    import { atom } from 'recoil';
    
    export const isDarkAtom = atom({
      key: 'isDark',
      default: false,
    });
    ```
    
2. 값을 사용하는 위치에서 `useRecoilValue()`를 사용.
    
    : Apollo Client의 `useReactiveVar()`와 유사한 것 같다.
    
    ```tsx
    import { useRecoilValue } from 'recoil';
    
    ...
    
    function App() {
      const isDark = useRecoilValue(isDarkAtom);
      return (
        <>
          <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
            <GlobalStyle />
            <Router />
            <ReactQueryDevtools initialIsOpen={true} />
          </ThemeProvider>
        </>
      );
    }
    ```
    
3. 값을 수정하는 위치에서 `useSetRecoilState()`를 사용.
    
    : Apollo Client의 `makeVar()`로 선언된 값을 재설정 할 때와 비슷하다고 느꼈다. 
    
    ```tsx
    import { useSetRecoilState } from 'recoil';
    
    ...
    
    function Coins() {
      const setDarkAtom = useSetRecoilState(isDarkAtom);
      const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
      const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins);
    
      return (
        <Container>
          <Helmet>
            <title>코인</title>
          </Helmet>
          <Header>
            <Title>코인</Title>
            <button onClick={toggleDarkAtom}>Toggle Mode</button>
          </Header>
    
    	...
    ```
    

# React Hook Form

React만으로 Input Validation, Form Submit, Change 등등 폼 관리를 하기에는 여러모로 불편하다. 이 문제점을 위해 보다 적은 양의 코드로 쉽게 작성 및 조작할 수 있는 라이브러리다.

## 사용 예)

```tsx
import { useForm } from 'react-hook-form';

function ToDoList() {
  const { register } = useForm();
  return (
    <div>
      <form>
        <input {...register("toDo")} placeholder="Write a to do" />
        <button>Add</button>
      </form>
    </div>
  );
}
```

## 코드량 비교

- react-hook-form을 사용하지 않았을 경우
    
    : 단순 코드량만 해도 엄청나게 줄어든 코드 양을 확인할 수 있다.
    
    ```tsx
    function ToDoList() {
      const [toDo, setToDo] = useState('');
      const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const {
          currentTarget: { value },
        } = event;
        setToDo(value);
      };
      const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('submit');
      };
      return (
        <div>
          <form onSubmit={onSubmit}>
            <input onChange={onChange} value={toDo} placeholder="Write a to do" />
            <button>Add</button>
          </form>
        </div>
      );
    }
    ```
    
- 하나의 input 태그라서 느끼기 어렵다면, 다음과 같은 경우에는 어떨까?
    
    : 저 모든 input을 `register()`함수 하나로 처리할 수 있다.
    
    ```tsx
    function ToDoList() {
      const { register } = useForm();
      return (
        <div>
          <form>
            <input {...register("email")} placeholder="Email" />
            <input {...register("firstName")} placeholder="First Name" />
            <input {...register("lastName")} placeholder="Last Name" />
            <input {...register("username")} placeholder="Username" />
            <input {...register("password")} placeholder="Password" />
            <input {...register("password1")} placeholder="Password1" />
            <button>Add</button>
          </form>
        </div>
      );
    }
    ```
    

## 사용법 알아보기

기본적인 사용법은 위에서 다뤘으니, 그 다음부터 진행해보자.

### Validation

1. required: 필수 데이터 여부를 처리할 수 있다.
    
    ```tsx
    <input {...register('email', { required: true })} placeholder="Email" />
    
    or 
    
    <input {...register('email', { required: 'Password is required' })} placeholder="Email" />
    ```