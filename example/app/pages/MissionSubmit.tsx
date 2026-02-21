import { useParams } from 'react-router';
import MobileLayout from '../components/MobileLayout';

export default function MissionSubmit() {
  const { id } = useParams();

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen">
        <header className="p-4 border-b bg-white sticky top-0">
          <div className="flex items-center gap-3">
            <a href={`/mission/${id}`} className="text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </a>
            <h1 className="text-lg">미션 제출하기</h1>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-1">보드게임 카페 가기</h3>
            <p className="text-sm text-purple-700">배점: 50점</p>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700 font-medium">
              인증 사진 * <span className="text-gray-500 font-normal">(최소 1장)</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 transition cursor-pointer">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-gray-600">클릭하여 사진 업로드</p>
              <p className="text-xs text-gray-500 mt-1">JPG, PNG (최대 10MB)</p>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700 font-medium">
              위치 인증 *
            </label>
            <button className="w-full border-2 border-purple-500 text-purple-600 py-3 rounded-lg hover:bg-purple-50 transition flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>현재 위치 가져오기</span>
            </button>
            <p className="text-xs text-gray-500 mt-2">※ 보드게임 카페 반경 200m 이내여야 합니다</p>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700 font-medium">
              참여자 선택 * <span className="text-gray-500 font-normal">(최소 3명)</span>
            </label>
            <div className="space-y-2">
              {['김새내', '이학생', '박참가', '최모임', '정친구', '한조원', '윤멤버'].map((name, i) => (
                <label key={i} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 text-purple-500 rounded" defaultChecked={i < 4} />
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white">
                    {name[0]}
                  </div>
                  <span className="text-sm">{name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700 font-medium">
              소요 시간 (분) *
            </label>
            <input
              type="number"
              placeholder="예: 120"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-xs text-gray-500 mt-2">※ 활동 합계 시간에 반영됩니다</p>
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700 font-medium">
              코멘트 (선택)
            </label>
            <textarea
              placeholder="미션 수행 소감이나 특이사항을 입력해주세요"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-900">
              <span className="font-semibold">⚠️ 주의사항</span><br/>
              • 제출 후에는 수정할 수 없습니다<br/>
              • 운영진 승인 후 점수가 반영됩니다<br/>
              • 반려된 경우 사유를 확인하고 재제출하세요
            </p>
          </div>
        </div>

        <div className="p-4 border-t bg-white space-y-3">
          <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg hover:opacity-90 transition">
            제출하기
          </button>
          <a href={`/mission/${id}`} className="block w-full text-center py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition">
            취소
          </a>
        </div>
      </div>
    </MobileLayout>
  );
}
