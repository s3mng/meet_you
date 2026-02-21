import MobileLayout from '../components/MobileLayout';

const recommendations = [
  { id: 1, name: '이선배', year: '25', mbti: 'ENFP', interest: '게임, 영화', match: 92 },
  { id: 2, name: '박선배', year: '24', mbti: 'INFJ', interest: '독서, 음악', match: 88 },
  { id: 3, name: '최동기', year: '26', mbti: 'ESFP', interest: '운동, 여행', match: 85 },
];

export default function MealMatchRequest() {
  return (
    <MobileLayout showNav={true}>
      <div className="flex flex-col min-h-screen">
        <header className="p-4 border-b bg-white sticky top-0">
          <h1 className="text-lg">밥약 신청</h1>
          <p className="text-sm text-gray-600 mt-1">원하는 사람에게 밥약을 신청하세요</p>
        </header>

        <div className="p-4 bg-gray-50 border-b">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border-2 border-purple-500 text-purple-500 rounded-lg text-sm">
              추천 매칭
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded-lg text-sm hover:border-gray-400">
              전체 멤버
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded-lg text-sm hover:border-gray-400">
              선배
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded-lg text-sm hover:border-gray-400">
              동기
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-3">
          {recommendations.map((person) => (
            <div key={person.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <div className="flex items-start gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xl flex-shrink-0">
                  {person.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{person.name}</h3>
                    <span className="text-xs text-gray-500">({person.year}학번)</span>
                    <span className="ml-auto text-sm text-purple-600 font-medium">{person.match}% 매칭</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">{person.mbti}</span>
                    {person.interest.split(', ').map((int, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{int}</span>
                    ))}
                  </div>
                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg text-sm hover:opacity-90 transition">
                    밥약 신청하기
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">💡 TIP</span><br/>
              관심사 프로필이 유사한 사람들이 상위에 표시됩니다. 프로필을 자세히 작성하면 더 좋은 매칭을 받을 수 있어요!
            </p>
          </div>
        </div>

        <div className="p-4 border-t bg-white">
          <a href="/home" className="block w-full text-center py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition">
            돌아가기
          </a>
        </div>
      </div>
    </MobileLayout>
  );
}
