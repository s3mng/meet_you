import MobileLayout from '../components/MobileLayout';

export default function Login() {
  return (
    <MobileLayout>
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="mb-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mx-auto mb-4 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-2xl mb-2">새내기 조모임</h1>
          <p className="text-gray-600 text-sm">함께 만들어가는 우리들의 추억</p>
        </div>

        <div className="w-full space-y-3">
          <input
            type="text"
            placeholder="아이디"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <a href="/role-selection" className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg text-center hover:opacity-90 transition">
            로그인
          </a>
        </div>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-600">아직 계정이 없으신가요?</p>
          <button className="text-sm text-purple-600 hover:underline">회원가입</button>
        </div>
      </div>
    </MobileLayout>
  );
}
