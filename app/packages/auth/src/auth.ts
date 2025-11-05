// Заглушка Auth.js v5-стиля: даём объект handlers, чтобы nextjs-роут мог сделать export { GET, POST }
export const handlers = {
  GET: async () => Response.json({ auth: "ok:get" }),
  POST: async () => Response.json({ auth: "ok:post" }),
};

// На будущее (когда подключишь реальный Auth.js):
// export const { handlers, auth, signIn, signOut } = NextAuth({ ... })
