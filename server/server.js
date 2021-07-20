const express = require("express");
const app = express();
const cors = require("cors"); //동일 기원이 아니더라고 붙을 수 있게?
const session = require("express-session"); //쿠키 생성 위해
const connect = require("./schemas"); //shemas 라는 폴더에 있는걸 가져와 사용하겠다.

connect(); //connect를 실행 시키면 스키마스 폴더의 인덱스 폴더의 내용이 실행된다.

const corsOptions = {
  origin: true,
  credentials: true
};

app.use(
  session({ //express-session을 사용하기 위한 setting
    resave: false,
    saveUninitialized: true,
    secret: "hamletshu",
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //배열과 같은 데이터들까지 받아오기 위해서

app.use("/member", require("./routes/memberRouter"));
app.use("/board", require("./routes/boardRouter"));
app.use("/calendar", require("./routes/calendarRouter"));
app.use("/comment", require("./routes/commentRouter"));

app.listen(80, () => {
  console.log("listening to port 80");
}); 