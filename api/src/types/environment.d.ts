export {}

// Типы для переменных окружения
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number
			NODE_ENV: 'development' | 'production' | 'test'
			JWT_SECRET: string
			JWT_EXPIRES: number
        }
    }
}
