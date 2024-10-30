import React, { useState } from 'react';
import InterviewComponent from '../components/InterviewComponent'; 
import VideoUpload from '../components/CandidateVideo'; 

const InterviewPage = () => {
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewEnded, setInterviewEnded] = useState(false);
  const [modalOpen, setModalOpen] = useState(true); // Modal state
  const [consentGiven, setConsentGiven] = useState(false); // Checkbox state

  const endInterview = () => {
    if (!interviewEnded) {
      setInterviewStarted(false);
      setInterviewEnded(true);
    }
  };

  const resetInterview = () => {
    setInterviewStarted(false);
    setInterviewEnded(false);
  };

  const checkPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      stream.getTracks().forEach(track => track.stop()); 
      return true;
    } catch (error) {
      console.error('Kamera ya da mikrofon izni reddedildi:', error);
      return false;
    }
  };

  const startInterview = async () => {
    const hasPermission = await checkPermissions();
    if (!hasPermission) {
      alert('Mülakatı başlatmak için kamera ve mikrofon erişimine izin vermeniz gerekiyor.');
      return;
    }

    resetInterview();
    setInterviewStarted(true);
  };

  const handleModalSubmit = () => {
    if (consentGiven) {
      setModalOpen(false);
      startInterview();
    }
  };

  return (
    <div className="interviewPage flex flex-col items-center justify-center h-screen w-full bg-gray-500 overflow-hidden">
      {modalOpen && (
        <div className="modal fixed inset-0 bg-black bg-opacity-200 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/3 lg:w-1/4 max-w-md">
            <h2 className="text-xl font-semibold mb-4">Mülakat Kaydı Hakkında</h2>
            <p className="mb-4">
              Bu mülakat sırasında video ve ses kaydı alınacaktır. Devam ederek, kayıt yapılmasını kabul etmiş sayılacaksınız. Mülakatı Başlat butonuna tıkladığınızda mülakat başlayacaktır. Kamera ve mikrofon izinlerini vermeniz gerekmektedir. Her soruya dürüst ve dikkatli yanıtlar vermeniz önemlidir.
              <span className="text-red-500 font-semibold">
                Mülakatı bitirdikten sonra videonuzun yüklenmesini bekleyiniz, aksi takdirde videonuz sisteme yüklenemeyecektir.
              </span>
              Yükleme tamamlandıktan sonra sayfayı kapatabilirsiniz. Herhangi bir teknik aksaklık durumunda lütfen yetkililere bildirin.
            </p>
  
            <label className="flex items-center mb-4">
              <input 
                type="checkbox" 
                checked={consentGiven} 
                onChange={() => setConsentGiven(!consentGiven)} 
                className="mr-2" 
              />
              Okudum, anladım
            </label>
            <button 
              className={`px-4 py-2 rounded-md transition duration-300 ${consentGiven ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`} 
              onClick={handleModalSubmit}
              disabled={!consentGiven}
            >
              Mülakatı Başlat
            </button>
          </div>
        </div>
      )}
  
      <div className="content flex flex-col md:flex-row w-full bg-white shadow-md rounded-lg overflow-hidden border-4 border-black">
        <div className="videoSection flex-grow p-2">
          <VideoUpload 
            interviewStarted={interviewStarted} 
            interviewEnded={interviewEnded} 
            onEndInterview={endInterview} 
          />
        </div>
        <div className="questionSection w-1/3 h-full p-2 border-l-4 border-black overflow-y-auto">
        <InterviewComponent 
       interviewStarted={interviewStarted} 
       interviewEnded={interviewEnded} 
       onEndInterview={endInterview} 
  />
</div>

      </div>
  
      <div className="controlSection mt-4">
        {interviewStarted && (
          <button className="px-8 py-2 bg-red-500 text-white rounded-md" onClick={endInterview}>
            Mülakatı Bitir
          </button>
        )}
        {interviewEnded && (
          <div className="fixed inset-0 bg-black bg-opacity-100 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg">
              <h2 className="text-2xl font-bold mb-4">Mülakat Tamamlanmıştır</h2>
              <p className="mb-4">Tarafınıza en kısa sürede dönüş yapılacaktır. Katıldığınız için teşekkürler!</p>
              <button 
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                onClick={() => window.close()}
 // Sayfadan çıkmak için buton fonksiyonu
              >
                Çık
              </button>
            </div>
          </div>
        )}
      </div>
    </div> // Bu parantez ile div'i kapatıyoruz
  ); }
  
  export default InterviewPage;
  
