import BioAgeScreen from "../screens/BioAgeScreen";
import BiometricPromptScreen from "../screens/BiometricPromptScreen";
import BookTestScreen from "../screens/BookTestScreen";
import CreateAccountScreen from "../screens/CreateAccountScreen";
import DEVAActionScreen from "../screens/DEVAActionScreen";
import DEVAInsightScreen from "../screens/DEVAInsightScreen";
import DNAReportScreen from "../screens/DNAReportScreen";
import EVAIChatScreen from "../screens/EVAIChatScreen";
import EmailVerifyScreen from "../screens/EmailVerifyScreen";
import FanfareScreen from "../screens/FanfareScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import LearnScreen from "../screens/LearnScreen";
import NotificationCentreScreen from "../screens/NotificationCentreScreen";
import OTPVerifyScreen from "../screens/OTPVerifyScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ProtocolScreen from "../screens/ProtocolScreen";
import QuestionnaireScreen from "../screens/QuestionnaireScreen";
import ReportViewerScreen from "../screens/ReportViewerScreen";
import ResultsTabScreen from "../screens/ResultsTabScreen";
import ResultsWowScreen from "../screens/ResultsWowScreen";
import RetestScreen from "../screens/RetestScreen";
import SignInScreen from "../screens/SignInScreen";
import SplashScreen from "../screens/SplashScreen";
import SubscriptionScreen from "../screens/SubscriptionScreen";
import SupplementDetailScreen from "../screens/SupplementDetailScreen";
import TermsScreen from "../screens/TermsScreen";
import TodayScreen from "../screens/TodayScreen";
import WaitingScreen from "../screens/WaitingScreen";
import WelcomeBackScreen from "../screens/WelcomeBackScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import { SafetyGateAlert } from "../components";

const SCREENS = {
  // ── Launch ──
  splash:{C:SplashScreen,j:"Launch",n:"Splash"},
  // ── Guest ──
  welcome:{C:WelcomeScreen,j:"Guest",n:"Welcome"},
  learn:{C:LearnScreen,j:"Guest",n:"Learn More"},
  // ── Auth ──
  signin:{C:SignInScreen,j:"Auth",n:"Sign In"},
  "otp-verify":{C:OTPVerifyScreen,j:"Auth",n:"Verify OTP"},
  "forgot-password":{C:ForgotPasswordScreen,j:"Auth",n:"Forgot Password"},
  "biometric-prompt":{C:BiometricPromptScreen,j:"Auth",n:"Biometric Setup"},
  "welcome-back":{C:WelcomeBackScreen,j:"Auth",n:"Welcome Back"},
  // ── Onboarding ──
  "book-test":{C:BookTestScreen,j:"Onboarding",n:"Book Biology Test"},
  "create-account":{C:CreateAccountScreen,j:"Onboarding",n:"Create Account"},
  "email-verify":{C:EmailVerifyScreen,j:"Onboarding",n:"Verify Email"},
  terms:{C:TermsScreen,j:"Onboarding",n:"Informed Consent"},
  questionnaire:{C:QuestionnaireScreen,j:"Onboarding",n:"Questionnaire"},
  fanfare:{C:FanfareScreen,j:"Onboarding",n:"All Set"},
  waiting:{C:WaitingScreen,j:"Onboarding",n:"Waiting Period"},
  results:{C:ResultsWowScreen,j:"Onboarding",n:"Results Reveal"},
  // ── Daily DEVA™ ──
  today:{C:TodayScreen,j:"Daily DEVA™",n:"Today"},
  "deva-insight":{C:DEVAInsightScreen,j:"Daily DEVA™",n:"DEVA™ Insight"},
  "supplement-detail":{C:SupplementDetailScreen,j:"Daily DEVA™",n:"Supplement Detail"},
  notifications:{C:NotificationCentreScreen,j:"Daily DEVA™",n:"Notifications"},
  protocol:{C:ProtocolScreen,j:"Daily DEVA™",n:"Protocol"},
  "eva-age":{C:BioAgeScreen,j:"Daily DEVA™",n:"EVA™ Age"},
  retest:{C:RetestScreen,j:"Daily DEVA™",n:"Re-Evaluation"},
  "deva-action":{C:DEVAActionScreen,j:"Daily DEVA™",n:"DEVA™ Action"},
  // ── Tabs ──
  "results-tab":{C:ResultsTabScreen,j:"Tabs",n:"My Biology"},
  "safety-demo":{C:({onBack,onNavigate})=><SafetyGateAlert level="red" marker="hs-CRP" value="22.4 mg/L" threshold="Critical: > 20.0 mg/L" onBook={()=>onNavigate("today")} onDismiss={()=>onNavigate("today")}/>,j:"Tabs",n:"Safety Gate (Demo)"},
  profile:{C:ProfileScreen,j:"Tabs",n:"Profile"},
  "dna-report":{C:(props)=><ReportViewerScreen {...props} subTarget="dna"/>,j:"Tabs",n:"DNA Reports"},
  subscription:{C:SubscriptionScreen,j:"Tabs",n:"Subscription"},
  "report-viewer":{C:ReportViewerScreen,j:"Tabs",n:"Report Viewer"},
  "clinician-chat":{C:EVAIChatScreen,j:"Tabs",n:"EV.AI™ Chat"},
};


export default SCREENS;
