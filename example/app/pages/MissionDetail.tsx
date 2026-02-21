import { useParams } from 'react-router';
import MobileLayout from '../components/MobileLayout';

export default function MissionDetail() {
  const { id } = useParams();

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen">
        <header className="p-4 border-b bg-white sticky top-0">
          <div className="flex items-center gap-3">
            <a href="/mission-list" className="text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </a>
            <h1 className="text-lg">미션 상세</h1>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-xl flex-1">보드게임 카페 가기</h2>
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full whitespace-nowrap">진행중</span>
            </div>
            <div className="flex items-center gap-4 text-sm opacity-90">
              <span>배점: 50점</span>
              <span>•</span>
              <span>마감: 2026.03.15</span>
            </div>
          </div>

          <div className="p-4 space-y-6">
            <div>
              <h3 className="font-semibold mb-2">미션 설명</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                조원들과 함께 보드게임 카페에 방문하여 즐거운 시간을 보내세요. 
                최소 3명 이상이 함께 참여해야 하며, 보드게임을 즐기는 사진을 
                인증으로 제출해주세요.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3">인증 방식</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>사진 1장 이상 필수</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>위치 인증 (반경 200m 이내)</span>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>참여자 3명 이상 체크</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">참여 현황</h3>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">조원 중 참여 의사 표시</span>
                  <span className="text-sm text-purple-600">5/7명</span>
                </div>
                <div className="flex -space-x-2">
                  {['김', '이', '박', '최', '정'].map((name, i) => (
                    <div key={i} className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-white flex items-center justify-center text-white">
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">진행 상황</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">미션 제출됨</p>
                    <p className="text-xs text-gray-600 mt-1">2026.02.20 오후 3:24</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">운영진 검토 중</p>
                    <p className="text-xs text-gray-600 mt-1">승인/반려 대기 중</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">💡 TIP</span><br/>
                사진은 조원들의 얼굴이 잘 보이도록 찍어주세요. 보드게임과 함께 찍으면 더 좋아요!
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t bg-white space-y-3">
          <a href={`/mission/${id}/submit`} className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg text-center hover:opacity-90 transition">
            미션 제출하기
          </a>
          <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition">
            참여 의사 표시하기
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}
