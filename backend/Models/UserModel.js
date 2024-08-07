import { queryDB } from "../db/queryDB.js"

const createUser = async (user) => {
  const query = `
    INSERT INTO users (name, email, password, phone, address)
    VALUES (?, ?, ?, ?, ?)
  `
  const value = [user.name, user.email, user.password, user.phone, user.address]
  return await queryDB(query, value)
}

const getUserByEmail = async (email) => {
  const query = `
    SELECT * FROM users WHERE email = ?
  `
  const value = [email]
  const users = await queryDB(query, value)
  return users[0]
}

const getUserById = async (id) => {
  const query = `
    SELECT email, phone, address FROM users WHERE id = ?
  `
  const value = [id]
  const users = await queryDB(query, value)
  return users[0]
}

const saveRefreshToken = async (userId, refreshToken) => {
  // 테이블에 userId가 존재하면 refresh_token을 갱신하고, 존재하지 않으면 새로운 레코드를 추가
  const query = `
    INSERT INTO refresh_tokens (user_id, token)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE token = VALUES(token)
  `
  const value = [userId, refreshToken]
  return await queryDB(query, value)
}

const getRefreshToken = async (userId) => {
  const query = `
    SELECT * FROM refresh_tokens WHERE user_id = ?
  `
  const value = [userId]
  const result = await queryDB(query, value)

  return result[0].token
}

export default {
  createUser,
  getUserByEmail,
  saveRefreshToken,
  getRefreshToken,
  getUserById,
}
