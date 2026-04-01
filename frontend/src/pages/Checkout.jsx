import { Link } from "react-router-dom";
import CheckoutNavbar from "../components/CheckoutNavbar";
import DeliveryAddress from "../components/DeliveryAddress";
import OrderSummary from "../components/OrderSummary";
import VoiceNote from "../components/VoiceNote";
// import PaymentDetails from "../components/PaymentDetails";

const Checkout = () => {
  return (
    <div className="bg-[#F5F3EE] min-h-screen">

      <CheckoutNavbar />

      {/* Page Header */}
      <div className="px-[5%] pt-6 pb-2 flex items-center gap-3">
        <button
          onClick={() => window.history.back()}
          className="text-[#151515] hover:text-[#F4521E] transition text-lg"
        >
          ←
        </button>
        <h1 className="font-['Sora'] font-bold text-2xl text-[#151515]">
          Checkout
        </h1>
      </div>

      {/* Two Column Layout */}
      <div className="px-[5%] py-4 flex gap-6 items-start">

        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-4">
          <DeliveryAddress />
          <OrderSummary />
          <VoiceNote />
        </div>

        {/* Right Column */}
        <div className="w-[320px] shrink-0 flex flex-col gap-4">
          {/* <PaymentDetails /> */}
        </div>

      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-black/5 bg-white px-[5%] py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#F4521E] rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
              <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1zm15.03-7c0-8-15.03-8-15.03 0h15.03zM1.02 17h15v2h-15z" />
            </svg>
          </div>
          <span className="font-bold text-sm text-[#F4521E]">BhojanGo</span>
        </div>
        <div className="flex items-center gap-8 text-sm">
          <Link to="/privacy" className="hover:text-[#F4521E] transition no-underline text-gray-400">Privacy Policy</Link>
          <Link to="/terms"   className="hover:text-[#F4521E] transition no-underline text-gray-400">Terms of Service</Link>
          <Link to="/rider"   className="hover:text-[#F4521E] transition no-underline text-gray-400">Become a Rider</Link>
          <Link to="/support" className="hover:text-[#F4521E] transition no-underline text-gray-400">Support</Link>
        </div>
        <span className="text-xs text-gray-400">
          © 2024 BhojanGo Technologies Inc.
        </span>
      </footer>

    </div>
  )
}

export default Checkout
