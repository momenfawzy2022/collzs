import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const milestones = [
	{
		count: 2000,
		rewards: [
			
			{ label: " 10 Item-Super", img: "/img/imgItmes/3001280.png" },
		],
	},
	{
		count: 5000,
		rewards: [
			{ label: "Vip(4)-1Day", img: "/img/imgItmes/741819.png" },
			{ label: "300 CPs (B)", img: "/img/cp.png" },
		],
	},
	{
		count: 10000,
		rewards: [
			{ label: "5000 Cps (B)", img: "/img/imgItmes/3300365.png" },
			
		],
	},
	{
		count: 20000,
		rewards: [{ label: "Stone 2 (B)", img: "/img/imgItmes/730006.png" }],
	},
];

export default function Preregister() {
// قيمة الحجز تبدأ من 0 وتزيد ديناميكياً
const [totalReservation, setTotalReservation] = useState(0);
const [progress, setProgress] = useState(0);
const targetProgress = totalReservation >= 20000 ? 100 : (totalReservation / 20000) * 100;
const progressRef = useRef<HTMLDivElement>(null);
const [showRules, setShowRules] = useState(false);
const [reserveAnim, setReserveAnim] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);
const navigate = useNavigate();
const location = useLocation();

// دالة وهمية لمحاكاة API جلب عدد الحجوزات
// دوال الربط مع باك اند Node.js و MySQL
const fetchReservationCount = async () => {
  const res = await fetch('http://localhost:5000/api/test/reservations');
  const data = await res.json();
  return data.count;
};

const incrementReservationCount = async () => {
  await fetch('http://localhost:5000/api/test/reservations', { method: 'POST' });
};

// عند تحميل الصفحة لأول مرة، جلب العدد من API
useEffect(() => {
  fetchReservationCount().then((count) => setTotalReservation(count));
}, []);

	// أنيميشن ديناميكي لشريط التقدم (يبدأ من صفر)
	useEffect(() => {
		let start = 0;
		const step = () => {
			start += (targetProgress - start) * 0.08;
			if (progressRef.current) {
				progressRef.current.style.width = `${start}%`;
			}
			setProgress(start);
			if (Math.abs(start - targetProgress) > 0.5) {
				requestAnimationFrame(step);
			} else {
				setProgress(targetProgress);
				if (progressRef.current)
					progressRef.current.style.width = `${targetProgress}%`;
			}
		};
		step();
	}, [targetProgress]);

	// تحديد milestone الحالي
	const currentMilestone = milestones.reduce(
		(acc, m) => (totalReservation >= m.count ? m.count : acc),
		0
	);

	// عند العودة من صفحة التسجيل، أظهر فورم التأكيد (يدعم query string)
	useEffect(() => {
const params = new URLSearchParams(location.search);
if (params.get('justRegistered') === '1') {
  setShowConfirm(true);
  window.history.replaceState({}, document.title, location.pathname); // إزالة الكويري بعد العرض
}
}, [location.search]);

// زيادة العدد بعد إظهار رسالة التأكيد
// زيادة العدد بعد إظهار رسالة التأكيد مرة واحدة فقط
const hasIncremented = useRef(false);
useEffect(() => {
  if (showConfirm && !hasIncremented.current) {
	hasIncremented.current = true;
	incrementReservationCount().then(() => {
	  fetchReservationCount().then((count) => setTotalReservation(count));
	});
  }
  if (!showConfirm) {
	hasIncremented.current = false;
  }
}, [showConfirm]);

	return (
		<div className="min-h-screen w-full flex flex-col  items-center justify-center relative overflow-x-hidden bg-black">
			{/* خلفية الفيديو */}
			<video
				autoPlay
				loop
				muted
				playsInline
				className="fixed inset-0 w-full h-full object-cover z-0"
			>
				<source src="/videos/hero-3.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			{/* خلفية الجانب الأيسر */}
			<div 
				className="absolute -left-20 top-0 w-1/2 h-full bg-cover bg-center transform-gpu transition-transform duration-1000 hover:scale-110 z-10"
				style={{
					backgroundImage: "url('/public/img/classe/zy-ys2.webp')",
					clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)"
				}}
			/>
			{/* خلفية الجانب الأيمن */}
			<div 
				className="absolute right-0 top-0 w-1/2 h-full bg-cover bg-center transform-gpu transition-transform duration-1000 hover:scale-110 z-10"
				style={{
					backgroundImage: "url('/img/classe/zy-hhj.webp')",
					clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)"
				}}
			/>
			{/* Overlay مع تأثيرات */}
			<div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-black/60 to-purple-900/80 z-10">
				{/* تأثير توهج في المنتصف */}
				<div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-400/50 to-transparent transform -translate-x-1/2 z-10" />
			</div>
			{/* تأثير التوهج عند Hover */}
			<div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-1000 z-10">
				<div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-purple-500/20" />
			</div>
			<div className="relative z-20 flex flex-col items-center w-full pt-10">
				{/* زر القوانين */}
				<button
					onClick={() => setShowRules(true)}
					className="absolute top-4 right-8 bg-[#18181c]/80 border-2 border-[#b45309] text-[#b45309] font-bold px-6 py-2 rounded-full shadow hover:bg-[#b45309] hover:text-white-100 transition-all duration-200 z-20"
				>
					Rules
				</button>
				{/* نافذة القوانين */}
				{showRules && (
					<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
						<div className="bg-[#fff7ed] rounded-2xl shadow-2xl p-8 max-w-lg w-full relative animate-fadeIn">
							<button
								className="absolute top-2 right-4 text-2xl text-[#b45309] font-bold"
								onClick={() => setShowRules(false)}
							>
								&times;
							</button>
							<h2 className="text-2xl font-extrabold text-[#b45309] mb-4">
								Reservation Rules
							</h2>
							<ul className="list-disc pl-6 text-[#7c2d12] text-lg space-y-2">
								<li>Each account can reserve only once.</li>
								<li>Rewards will be sent after server launch.</li>
								<li>Fake or duplicate reservations will be removed.</li>
								<li>Contact support for any issues.</li>
							</ul>
						</div>
					</div>
				)}
				{/* العنوان */}
				<h1 className="text-5xl md:text-6xl font-extrabold text-[#7c2d12] mb-2 drop-shadow-lg text-center tracking-tight animate-fadeIn">
					WarringLands_EU <br />
					<span className="text-[#b45309]">New Server Reservation</span>
				</h1>
				<div className="bg-[#b45309] text-white-100 px-8 py-2 rounded-full font-bold text-2xl mb-2 shadow-lg animate-pulse tracking-wide animate-fadeIn">
					More Reservations, More Rewards!
				</div>
				<div className="text-3xl font-bold text-[#7c2d12] mb-1 tracking-wide animate-fadeIn">
					7.08-7.28
				</div>
				{/* شريط عدد الحجوزات */}
				<div className="w-full flex justify-center mb-2 animate-fadeIn">
					<div className="bg-gradient-to-r from-[#b45309] to-[#fbbf24] text-white-100 px-8 py-2 rounded-full font-bold text-lg shadow-lg border-2 border-[#fff7ed]">
						Total Reservation: {totalReservation.toLocaleString()}
					</div>
				</div>
				{/* شريط التقدم */}
				<div className="w-full max-w-5xl px-4 mb-8 relative animate-fadeIn">
					<div className="relative h-10 bg-gradient-to-r from-[#fbbf24] via-[#f59e42] to-[#fbbf24] rounded-full shadow-xl border-4 border-[#b45309] flex items-center">
						{/* شريط التقدم الفعلي */}
						<div
							ref={progressRef}
							className="absolute left-0 top-0 h-10 rounded-full transition-all duration-700 shadow-lg"
							style={{
								width: `${progress}%`,
								background:
									"linear-gradient(90deg, #f59e42 0%, #fbbf24 60%, #f59e42 100%)",
								boxShadow: "0 0 16px 2px #fbbf24, 0 2px 8px #f59e42",
							}}
						/>
						{/* مؤشرات milestones */}
						<div className="absolute left-0 top-0 w-full h-10 flex justify-between items-center px-2 z-10">
							{milestones.map((m) => (
								<div key={m.count} className="flex flex-col items-center">
									<div
										className={`w-4 h-10 ${
											progress >= (m.count / 20000) * 100
												? "bg-[#b45309] scale-110 shadow-lg"
												: "bg-gray-300"
										} rounded-full border-2 border-white transition-all duration-500`}
									/>
									<span
										className={`text-xs font-bold mt-1 ${
											progress >= (m.count / 20000) * 100
												? "text-[#b45309] scale-110"
												: "text-gray-400"
										}`}
									>
										{m.count}
									</span>
								</div>
							))}
						</div>
						{/* نسبة التقدم */}
						<div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b45309] font-extrabold text-xl z-20 drop-shadow animate-fadeIn">
							{Math.round(progress)}%
						</div>
					</div>
				</div>
				{/* بطاقات الجوائز */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 w-full max-w-6xl px-4 animate-fadeIn">
					{milestones.map((m) => (
						<div
							key={m.count}
							className={`relative group h-[300px] transition-all duration-500 ${
								currentMilestone === m.count ? "scale-105" : ""
							}`}
						>
							{/* خلفية البطاقة */}
							<div 
								className="absolute inset-0 bg-cover bg-center rounded-2xl shadow-2xl overflow-hidden"
								style={{
									backgroundImage: "url('/img/titel.png')",
								}}
							>
								{/* طبقة التأثير */}
								<div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
							</div>
							{/* محتوى البطاقة */}
							<div className="relative h-full flex flex-col w-full items-center justify-between p-6 text-white">
								{/* الدائرة مع الصورة */}
								<div className="w-full h-100 rounded-full mt-[100px] transform -translate-y-8 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center relative">
									<div className="w-full h-full rounded-full flex items-center justify-center">
										<img
											src={m.rewards[0].img}
											alt={m.rewards[0].label}
											className="w-16 h-16 object-contain drop-shadow-lg"
										/>
										{m.rewards[0].label && (
											<span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
												{m.rewards[0].label}
											</span>
										)}
									</div>
								</div>
								{/* العنوان */}
								<div className="text-center mt-[30px]">
									<h3 className="text-2xl font-bold drop-shadow-lg">
										{m.count.toLocaleString()}
									</h3>
									<p className="text-white/80 text-sm">Reservation</p>
								</div>
								{/* باقي محتوى البطاقة إذا وجد */}
							</div>
						</div>
					))}
				</div>
				{/* زر التسجيل */}
				<button
					onClick={() => {
						setReserveAnim(true);
						setTimeout(() => setReserveAnim(false), 600);
						navigate("/register", { state: { fromPreregister: true } });
					}}
					className={`bg-gradient-to-r from-[#b45309] to-[#fbbf24] hover:from-[#a16207] hover:to-[#fbbf24] text-white-100 text-3xl font-extrabold px-24 py-5 rounded-3xl shadow-2xl transition-all duration-200 active:scale-95 border-4 border-[#fff7ed] tracking-wider ${
						reserveAnim ? "animate-pulse" : ""
					}`}
					style={{
						boxShadow: "0 8px 32px 0 rgba(180,83,9,0.25)",
					}}
				>
					Sign Up Now
				</button>
				{/* فورم تأكيد التسجيل بعد العودة */}
				{showConfirm && (
					<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
						<div className="bg-[#fff7ed] rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-fadeIn flex flex-col items-center">
							<button
								className="absolute top-2 right-4 text-2xl text-[#b45309] font-bold"
								onClick={() => setShowConfirm(false)}
							>
								&times;
							</button>
							<h2 className="text-2xl font-extrabold text-[#b45309] mb-4">
								Registration Complete
							</h2>
							<p className="text-[#7c2d12] text-lg mb-4">
								Your registration was successful!
								<br />
								You will receive your rewards after the server launch.
							</p>
							<button
								className="bg-blue-300 hover:bg-blue-400 text-[#18181c] font-bold px-8 py-3 rounded-xl shadow transition-all"
								onClick={() => setShowConfirm(false)}
							>
								Back to Reservation
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}