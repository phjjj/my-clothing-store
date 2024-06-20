import userService from "../services/userService.js";
import StatusCodes from "http-status-codes";

const postSignUp = async (req, res) => {
  try {
    const user = req.body;
    await userService.registerUser(user);
    res.status(StatusCodes.CREATED).json({ message: "회원가입 완료" });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "회원가입 실패", error: error.message });
  }
};

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await userService.loginUser(
      email,
      password
    );

    res.setHeader("Authorization", `Bearer ${accessToken}`);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, // https에서만 쿠키 전송
      sameSite: "strict", // 같은 사이트에서만 쿠키 전송
    });

    res.status(StatusCodes.OK).json({ message: "로그인 성공" });
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "로그인 실패", error: error.message });
  }
};

// refreshToken을 사용해 accessToken을 갱신하는 컨트롤러
const postRefreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const tokens = await userService.checkRefreshToken(refreshToken);

    res.setHeader("Authorization", `Bearer ${tokens.accessToken}`);
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: true, // https에서만 쿠키 전송
      sameSite: "strict", // 같은 사이트에서만 쿠키 전송
    });

    res.status(StatusCodes.OK).json({ message: "토큰 갱신 성공" });
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "refreshToken 만료", error: error.message });
  }
};

export { postSignUp, postLogin, postRefreshToken };