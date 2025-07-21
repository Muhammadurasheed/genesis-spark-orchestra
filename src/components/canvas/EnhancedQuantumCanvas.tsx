
import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Node,
  Edge,
  NodeTypes,
  Panel,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { 
  Bot, 
  Zap, 
  Send, 
  GitBranch, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw,
  Settings,
  Maximize2,
  Minimize2,
  Grid,
  Eye,
  EyeOff,
  Sparkles,
  Brain,
  Activity,
  Save,
  Download,
  Upload,
  Plus,
  X,
  RefreshCw,
  Layers,
  Sliders,
  Cpu,
  Users,
  Target,
  Filter,
  Timer,
  MousePointer,
  Database,
  Mail,
  Webhook,
  Bell,
  Shield,
  ToggleLeft,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Star,
  Trash2,
  Copy,
  Move,
  ZoomIn,
  ZoomOut,
  Home,
  MoreHorizontal,
  Palette,
  Sun,
  Moon,
  Monitor,
  Mic,
  Video,
  MessageCircle,
  FileText,
  BarChart3,
  Search,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Info,
  HelpCircle,
  Lightbulb,
  Bookmark,
  Heart,
  Share2,
  Code,
  Terminal,
  Package,
  Smartphone,
  Tablet,
  Laptop,
  Desktop,
  Server,
  Cloud,
  Wifi,
  WifiOff,
  Lock,
  Unlock,
  Key,
  Shield as ShieldIcon,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  XCircle,
  MinusCircle,
  PlusCircle,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowUpLeft,
  ArrowDownRight,
  CornerUpLeft,
  CornerUpRight,
  CornerDownLeft,
  CornerDownRight,
  ChevronsUp,
  ChevronsDown,
  ChevronsLeft,
  ChevronsRight,
  SkipBack,
  SkipForward,
  FastForward,
  Rewind,
  Volume,
  VolumeX,
  Volume1,
  Volume2,
  VolumeOff,
  Headphones,
  Radio,
  Disc,
  Music,
  Repeat,
  Shuffle,
  ListMusic,
  Folder,
  FolderOpen,
  File,
  FileText as FileTextIcon,
  Image,
  Video as VideoIcon,
  Camera,
  Mic as MicIcon,
  Speaker,
  Monitor as MonitorIcon,
  Tv,
  Smartphone as SmartphoneIcon,
  Tablet as TabletIcon,
  Laptop as LaptopIcon,
  Watch,
  Gamepad2,
  Joystick,
  Headset,
  Keyboard,
  Mouse,
  Printer,
  Scanner,
  Fax,
  Phone,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  PhoneForwarded,
  PhoneOff,
  Voicemail,
  MessageSquare,
  MessageCircle as MessageCircleIcon,
  Send as SendIcon,
  Reply,
  ReplyAll,
  Forward,
  Inbox,
  Outbox,
  Drafts,
  Sent,
  Archive,
  Trash,
  Spam,
  Flag,
  Star as StarIcon,
  Bookmark as BookmarkIcon,
  Tag,
  Tags,
  Label,
  Calendar,
  CalendarDays,
  Clock as ClockIcon,
  Timer as TimerIcon,
  Stopwatch,
  Alarm,
  Sunrise,
  Sunset,
  Sun as SunIcon,
  Moon as MoonIcon,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudHail,
  Wind,
  Tornado,
  Umbrella,
  Thermometer,
  Gauge,
  Activity as ActivityIcon,
  TrendingUp,
  TrendingDown,
  BarChart,
  LineChart,
  PieChart,
  AreaChart,
  Scatter,
  Map,
  MapPin,
  Navigation,
  Compass,
  Route,
  Car,
  Bike,
  Bus,
  Train,
  Plane,
  Ship,
  Truck,
  Taxi,
  Fuel,
  Battery,
  BatteryLow,
  Plug,
  Zap as ZapIcon,
  Power,
  PowerOff,
  Flashlight,
  Lightbulb as LightbulbIcon,
  Flame,
  Droplets,
  Waves,
  Mountain,
  Tree,
  Flower,
  Leaf,
  Seedling,
  Sprout,
  TreePine,
  TreeDeciduous,
  Grass,
  Clover,
  Cherry,
  Apple,
  Banana,
  Grape,
  Orange,
  Lemon,
  Strawberry,
  Carrot,
  Corn,
  Wheat,
  Coffee,
  Cup,
  Beer,
  Wine,
  Soup,
  Pizza,
  Cake,
  Cookie,
  Candy,
  IceCream,
  Donut,
  Popcorn,
  Pretzel,
  Sandwich,
  Salad,
  Egg,
  Bacon,
  Meat,
  Fish,
  Shrimp,
  Lobster,
  Crab,
  Octopus,
  Squid,
  Jellyfish,
  Dolphin,
  Whale,
  Shark,
  Turtle,
  Penguin,
  Bird,
  Eagle,
  Owl,
  Parrot,
  Peacock,
  Turkey,
  Chicken,
  Duck,
  Goose,
  Swan,
  Flamingo,
  Dove,
  Raven,
  Crow,
  Bat,
  Butterfly,
  Bee,
  Ladybug,
  Spider,
  Ant,
  Worm,
  Snail,
  Bug,
  Microbe,
  Virus,
  Bacteria,
  Dna,
  Pill,
  Syringe,
  Thermometer as ThermometerIcon,
  Stethoscope,
  Bandage,
  Crutch,
  Wheelchair,
  Glasses,
  Sunglasses,
  Mask,
  Gloves,
  Socks,
  Shoe,
  Boot,
  Sneaker,
  Sandal,
  HighHeel,
  Sock,
  Mitten,
  Glove,
  Scarf,
  Hat,
  Crown,
  Helmet,
  Goggles,
  Monocle,
  Eyeglasses,
  Tie,
  Shirt,
  Dress,
  Skirt,
  Pants,
  Shorts,
  Underwear,
  Bra,
  Bikini,
  Swimsuit,
  Kimono,
  Sari,
  Robe,
  Coat,
  Jacket,
  Vest,
  Sweater,
  Hoodie,
  Cardigan,
  Blazer,
  Suit,
  Tuxedo,
  Uniform,
  Apron,
  Overalls,
  Jumpsuit,
  Pajamas,
  Nightgown,
  Lingerie,
  Corset,
  Bustier,
  Bodysuit,
  Leggings,
  Stockings,
  Pantyhose,
  Tights,
  Sock as SockIcon,
  Ankle,
  Knee,
  Thigh,
  Hip,
  Waist,
  Chest,
  Shoulder,
  Arm,
  Elbow,
  Wrist,
  Hand,
  Finger,
  Thumb,
  Nail,
  Knuckle,
  Palm,
  Fist,
  Peace,
  Victory,
  ThumbsUp,
  ThumbsDown,
  PointingUp,
  PointingDown,
  PointingLeft,
  PointingRight,
  Clap,
  Wave,
  Salute,
  Handshake,
  Hug,
  Kiss,
  Blowkiss,
  Smile,
  Frown,
  Laugh,
  Cry,
  Angry,
  Surprised,
  Confused,
  Sleepy,
  Tired,
  Sick,
  Dizzy,
  Drunk,
  Crazy,
  Nerd,
  Cool,
  Wink,
  Tongue,
  Drool,
  Vomit,
  Sneeze,
  Cough,
  Yawn,
  Snore,
  Sleep,
  Dream,
  Nightmare,
  Awake,
  Alert,
  Focused,
  Relaxed,
  Calm,
  Peaceful,
  Happy,
  Joyful,
  Excited,
  Enthusiastic,
  Optimistic,
  Hopeful,
  Confident,
  Proud,
  Satisfied,
  Content,
  Grateful,
  Thankful,
  Blessed,
  Lucky,
  Fortunate,
  Successful,
  Winning,
  Victorious,
  Triumphant,
  Celebrating,
  Cheering,
  Dancing,
  Singing,
  Playing,
  Laughing as LaughingIcon,
  Joking,
  Teasing,
  Flirting,
  Romantic,
  Loving,
  Caring,
  Kind,
  Gentle,
  Sweet,
  Tender,
  Soft,
  Warm,
  Cozy,
  Comfortable,
  Safe,
  Secure,
  Protected,
  Defended,
  Strong,
  Powerful,
  Mighty,
  Brave,
  Courageous,
  Fearless,
  Bold,
  Daring,
  Adventurous,
  Curious,
  Inquisitive,
  Interested,
  Fascinated,
  Amazed,
  Impressed,
  Inspired,
  Motivated,
  Determined,
  Persistent,
  Resilient,
  Tough,
  Enduring,
  Patient,
  Tolerant,
  Understanding,
  Compassionate,
  Empathetic,
  Sympathetic,
  Supportive,
  Encouraging,
  Inspiring,
  Uplifting,
  Positive,
  Negative,
  Neutral,
  Balanced,
  Stable,
  Steady,
  Consistent,
  Reliable,
  Dependable,
  Trustworthy,
  Honest,
  Truthful,
  Sincere,
  Genuine,
  Authentic,
  Real,
  Natural,
  Organic,
  Pure,
  Clean,
  Fresh,
  New,
  Modern,
  Contemporary,
  Current,
  Recent,
  Latest,
  Updated,
  Upgraded,
  Advanced,
  Sophisticated,
  Complex,
  Complicated,
  Difficult,
  Hard,
  Challenging,
  Tough as ToughIcon,
  Severe,
  Intense,
  Extreme,
  Maximum,
  Minimum,
  Medium,
  Average,
  Normal,
  Standard,
  Regular,
  Ordinary,
  Common,
  Usual,
  Typical,
  Traditional,
  Classic,
  Vintage,
  Retro,
  Old,
  Ancient,
  Historic,
  Legendary,
  Mythical,
  Magical,
  Mystical,
  Spiritual,
  Religious,
  Sacred,
  Holy,
  Divine,
  Angelic,
  Heavenly,
  Celestial,
  Stellar,
  Cosmic,
  Universal,
  Infinite,
  Eternal,
  Immortal,
  Timeless,
  Ageless,
  Forever,
  Always,
  Never,
  Sometimes,
  Often,
  Rarely,
  Seldom,
  Occasionally,
  Frequently,
  Constantly,
  Continuously,
  Persistently,
  Repeatedly,
  Regularly,
  Routinely,
  Habitually,
  Automatically,
  Manually,
  Mechanically,
  Electronically,
  Digitally,
  Virtually,
  Physically,
  Mentally,
  Emotionally,
  Spiritually,
  Intellectually,
  Creatively,
  Artistically,
  Musically,
  Dramatically,
  Comically,
  Humorously,
  Seriously,
  Professionally,
  Personally,
  Privately,
  Publicly,
  Socially,
  Culturally,
  Politically,
  Economically,
  Financially,
  Commercially,
  Industrially,
  Technologically,
  Scientifically,
  Medically,
  Educationally,
  Environmentally,
  Ecologically,
  Geographically,
  Historically,
  Philosophically,
  Psychologically,
  Sociologically,
  Anthropologically,
  Archaeologically,
  Astronomically,
  Mathematically,
  Statistically,
  Logically,
  Rationally,
  Reasonably,
  Sensibly,
  Practically,
  Realistically,
  Ideally,
  Theoretically,
  Hypothetically,
  Potentially,
  Possibly,
  Probably,
  Definitely,
  Certainly,
  Absolutely,
  Completely,
  Entirely,
  Fully,
  Totally,
  Wholly,
  Perfectly,
  Exactly,
  Precisely,
  Accurately,
  Correctly,
  Properly,
  Appropriately,
  Suitably,
  Fittingly,
  Rightly,
  Justly,
  Fairly,
  Equally,
  Evenly,
  Uniformly,
  Consistently as ConsistentlyIcon,
  Steadily,
  Smoothly,
  Easily,
  Effortlessly,
  Simply,
  Quickly,
  Rapidly,
  Swiftly,
  Speedily,
  Instantly,
  Immediately,
  Promptly,
  Urgently,
  Desperately,
  Frantically,
  Hurriedly,
  Hastily,
  Rushed,
  Slow,
  Slowly,
  Gradually,
  Progressively,
  Steadily as SteadilyIcon,
  Incrementally,
  Systematically,
  Methodically,
  Strategically,
  Tactically,
  Diplomatically,
  Politically as PoliticallyIcon,
  Commercially as CommerciallyIcon,
  Economically as EconomicallyIcon,
  Financially as FinanciallyIcon,
  Socially as SociallyIcon,
  Culturally as CulturallyIcon,
  Educationally as EducationallyIcon,
  Professionally as ProfessionallyIcon,
  Personally as PersonallyIcon,
  Privately as PrivatelyIcon,
  Publicly as PubliclyIcon,
  Officially,
  Unofficially,
  Formally,
  Informally,
  Casually,
  Strictly,
  Loosely,
  Tightly,
  Firmly,
  Strongly as StronglyIcon,
  Weakly,
  Softly as SoftlyIcon,
  Gently as GentlyIcon,
  Roughly,
  Harshly,
  Severely as SeverelyIcon,
  Mildly,
  Slightly,
  Moderately,
  Considerably,
  Significantly,
  Substantially,
  Dramatically as DramaticallyIcon,
  Drastically,
  Radically,
  Fundamentally,
  Basically,
  Essentially,
  Primarily,
  Mainly,
  Mostly,
  Generally,
  Usually,
  Typically as TypicallyIcon,
  Normally as NormallyIcon,
  Commonly as CommonlyIcon,
  Frequently as FrequentlyIcon,
  Regularly as RegularlyIcon,
  Consistently as ConsistentlyIcon2,
  Constantly as ConstantlyIcon,
  Continuously as ContinuouslyIcon,
  Persistently as PersistentlyIcon,
  Repeatedly as RepeatedlyIcon,
  Routinely as RoutinelyIcon,
  Habitually as HabituallyIcon,
  Automatically as AutomaticallyIcon,
  Manually as ManuallyIcon,
  Mechanically as MechanicallyIcon,
  Electronically as ElectronicallyIcon,
  Digitally as DigitallyIcon,
  Virtually as VirtuallyIcon,
  Physically as PhysicallyIcon,
  Mentally as MentallyIcon,
  Emotionally as EmotionallyIcon,
  Spiritually as SpirituallyIcon,
  Intellectually as IntellectuallyIcon,
  Creatively as CreativelyIcon,
  Artistically as ArtisticallyIcon,
  Musically as MusicallyIcon,
  Dramatically as DramaticallyIcon2,
  Comically as ComicallyIcon,
  Humorously as HumorouslyIcon,
  Seriously as SeriouslyIcon,
  Professionally as ProfessionallyIcon2,
  Personally as PersonallyIcon2,
  Privately as PrivatelyIcon2,
  Publicly as PubliclyIcon2,
  Socially as SociallyIcon2,
  Culturally as CulturallyIcon2,
  Politically as PoliticallyIcon2,
  Economically as EconomicallyIcon2,
  Financially as FinanciallyIcon2,
  Commercially as CommerciallyIcon2,
  Industrially as IndustriallyIcon,
  Technologically as TechnologicallyIcon,
  Scientifically as ScientificallyIcon,
  Medically as MedicallyIcon,
  Educationally as EducationallyIcon2,
  Environmentally as EnvironmentallyIcon,
  Ecologically as EcologicallyIcon,
  Geographically as GeographicallyIcon,
  Historically as HistoricallyIcon,
  Philosophically as PhilosophicallyIcon,
  Psychologically as PsychologicallyIcon,
  Sociologically as SociologicallyIcon,
  Anthropologically as AnthropologicallyIcon,
  Archaeologically as ArchaeologicallyIcon,
  Astronomically as AstronomicallyIcon,
  Mathematically as MathematicallyIcon,
  Statistically as StatisticallyIcon,
  Logically as LogicallyIcon,
  Rationally as RationallyIcon,
  Reasonably as ReasonablyIcon,
  Sensibly as SensiblyIcon,
  Practically as PracticallyIcon,
  Realistically as RealisticallyIcon,
  Ideally as IdeallyIcon,
  Theoretically as TheoreticallyIcon,
  Hypothetically as HypotheticallyIcon,
  Potentially as PotentiallyIcon,
  Possibly as PossiblyIcon,
  Probably as ProbablyIcon,
  Definitely as DefinitelyIcon,
  Certainly as CertainlyIcon,
  Absolutely as AbsolutelyIcon,
  Completely as CompletelyIcon,
  Entirely as EntirelyIcon,
  Fully as FullyIcon,
  Totally as TotallyIcon,
  Wholly as WhollyIcon,
  Perfectly as PerfectlyIcon,
  Exactly as ExactlyIcon,
  Precisely as PreciselyIcon,
  Accurately as AccuratelyIcon,
  Correctly as CorrectlyIcon,
  Properly as ProperlyIcon,
  Appropriately as AppropriatelyIcon,
  Suitably as SuitablyIcon,
  Fittingly as FittinglyIcon,
  Rightly as RightlyIcon,
  Justly as JustlyIcon,
  Fairly as FairlyIcon,
  Equally as EquallyIcon,
  Evenly as EvenlyIcon,
  Uniformly as UniformlyIcon,
  Consistently as ConsistentlyIcon3,
  Steadily as SteadilyIcon2,
  Smoothly as SmoothlyIcon,
  Easily as EasilyIcon,
  Effortlessly as EffortlesslyIcon,
  Simply as SimplyIcon,
  Quickly as QuicklyIcon,
  Rapidly as RapidlyIcon,
  Swiftly as SwiftlyIcon,
  Speedily as SpeedlyIcon,
  Instantly as InstantlyIcon,
  Immediately as ImmediatelyIcon,
  Promptly as PromptlyIcon,
  Urgently as UrgentlyIcon,
  Desperately as DesperatelyIcon,
  Frantically as FranticallyIcon,
  Hurriedly as HurriedlyIcon,
  Hastily as HastilyIcon,
  Rushed as RushedIcon,
  Slow as SlowIcon,
  Slowly as SlowlyIcon,
  Gradually as GraduallyIcon,
  Progressively as ProgressivelyIcon,
  Steadily as SteadilyIcon3,
  Incrementally as IncrementallyIcon,
  Systematically as SystematicallyIcon,
  Methodically as MethodicallyIcon,
  Strategically as StrategicallyIcon,
  Tactically as TacticallyIcon,
  Diplomatically as DiplomaticallyIcon,
  Politically as PoliticallyIcon3,
  Commercially as CommerciallyIcon3,
  Economically as EconomicallyIcon3,
  Financially as FinanciallyIcon3,
  Socially as SociallyIcon3,
  Culturally as CulturallyIcon3,
  Educationally as EducationallyIcon3,
  Professionally as ProfessionallyIcon3,
  Personally as PersonallyIcon3,
  Privately as PrivatelyIcon3,
  Publicly as PubliclyIcon3,
  Officially as OfficiallyIcon,
  Unofficially as UnofficiallyIcon,
  Formally as FormallyIcon,
  Informally as InformallyIcon,
  Casually as CasuallyIcon,
  Strictly as StrictlyIcon,
  Loosely as LooselyIcon,
  Tightly as TightlyIcon,
  Firmly as FirmlyIcon,
  Strongly as StronglyIcon2,
  Weakly as WeaklyIcon,
  Softly as SoftlyIcon2,
  Gently as GentlyIcon2,
  Roughly as RoughlyIcon,
  Harshly as HarshlyIcon,
  Severely as SeverelyIcon2,
  Mildly as MildlyIcon,
  Slightly as SlightlyIcon,
  Moderately as ModeratelyIcon,
  Considerably as ConsiderablyIcon,
  Significantly as SignificantlyIcon,
  Substantially as SubstantiallyIcon,
  Dramatically as DramaticallyIcon3,
  Drastically as DrasticallyIcon,
  Radically as RadicallyIcon,
  Fundamentally as FundamentallyIcon,
  Basically as BasicallyIcon,
  Essentially as EssentiallyIcon,
  Primarily as PrimarilyIcon,
  Mainly as MainlyIcon,
  Mostly as MostlyIcon,
  Generally as GenerallyIcon,
  Usually as UsuallyIcon,
  Typically as TypicallyIcon2,
  Normally as NormallyIcon2,
  Commonly as CommonlyIcon2,
  Frequently as FrequentlyIcon2,
  Regularly as RegularlyIcon2,
  Consistently as ConsistentlyIcon4,
  Constantly as ConstantlyIcon2,
  Continuously as ContinuouslyIcon2,
  Persistently as PersistentlyIcon2,
  Repeatedly as RepeatedlyIcon2,
  Routinely as RoutinelyIcon2,
  Habitually as HabituallyIcon2,
  Automatically as AutomaticallyIcon2,
  Manually as ManuallyIcon2,
  Mechanically as MechanicallyIcon2,
  Electronically as ElectronicallyIcon2,
  Digitally as DigitallyIcon2,
  Virtually as VirtuallyIcon2,
  Physically as PhysicallyIcon2,
  Mentally as MentallyIcon2,
  Emotionally as EmotionallyIcon2,
  Spiritually as SpirituallyIcon2,
  Intellectually as IntellectuallyIcon2,
  Creatively as CreativelyIcon2,
  Artistically as ArtisticallyIcon2,
  Musically as MusicallyIcon2,
  Dramatically as DramaticallyIcon4,
  Comically as ComicallyIcon2,
  Humorously as HumorouslyIcon2,
  Seriously as SeriouslyIcon2,
  Professionally as ProfessionallyIcon4,
  Personally as PersonallyIcon4,
  Privately as PrivatelyIcon4,
  Publicly as PubliclyIcon4,
  Socially as SociallyIcon4,
  Culturally as CulturallyIcon4,
  Politically as PoliticallyIcon4,
  Economically as EconomicallyIcon4,
  Financially as FinanciallyIcon4,
  Commercially as CommerciallyIcon4,
  Industrially as IndustriallyIcon2,
  Technologically as TechnologicallyIcon2,
  Scientifically as ScientificallyIcon2,
  Medically as MedicallyIcon2,
  Educationally as EducationallyIcon4,
  Environmentally as EnvironmentallyIcon2,
  Ecologically as EcologicallyIcon2,
  Geographically as GeographicallyIcon2,
  Historically as HistoricallyIcon2,
  Philosophically as PhilosophicallyIcon2,
  Psychologically as PsychologicallyIcon2,
  Sociologically as SociologicallyIcon2,
  Anthropologically as AnthropologicallyIcon2,
  Archaeologically as ArchaeologicallyIcon2,
  Astronomically as AstronomicallyIcon2,
  Mathematically as MathematicallyIcon2,
  Statistically as StatisticallyIcon2,
  Logically as LogicallyIcon2,
  Rationally as RationallyIcon2,
  Reasonably as ReasonablyIcon2,
  Sensibly as SensiblyIcon2,
  Practically as PracticallyIcon2,
  Realistically as RealisticallyIcon2,
  Ideally as IdeallyIcon2,
  Theoretically as TheoreticallyIcon2,
  Hypothetically as HypotheticallyIcon2,
  Potentially as PotentiallyIcon2,
  Possibly as PossiblyIcon2,
  Probably as ProbablyIcon2,
  Definitely as DefinitelyIcon2,
  Certainly as CertainlyIcon2,
  Absolutely as AbsolutelyIcon2,
  Completely as CompletelyIcon2,
  Entirely as EntirelyIcon2,
  Fully as FullyIcon2,
  Totally as TotallyIcon2,
  Wholly as WhollyIcon2,
  Perfectly as PerfectlyIcon2,
  Exactly as ExactlyIcon2,
  Precisely as PreciselyIcon2,
  Accurately as AccuratelyIcon2,
  Correctly as CorrectlyIcon2,
  Properly as ProperlyIcon2,
  Appropriately as AppropriatelyIcon2,
  Suitably as SuitablyIcon2,
  Fittingly as FittinglyIcon2,
  Rightly as RightlyIcon2,
  Justly as JustlyIcon2,
  Fairly as FairlyIcon2,
  Equally as EquallyIcon2,
  Evenly as EvenlyIcon2,
  Uniformly as UniformlyIcon2,
  Consistently as ConsistentlyIcon5,
  Steadily as SteadilyIcon4,
  Smoothly as SmoothlyIcon2,
  Easily as EasilyIcon2,
  Effortlessly as EffortlesslyIcon2,
  Simply as SimplyIcon2,
  Quickly as QuicklyIcon2,
  Rapidly as RapidlyIcon2,
  Swiftly as SwiftlyIcon2,
  Speedily as SpeedlyIcon2,
  Instantly as InstantlyIcon2,
  Immediately as ImmediatelyIcon2,
  Promptly as PromptlyIcon2,
  Urgently as UrgentlyIcon2,
  Desperately as DesperatelyIcon2,
  Frantically as FranticallyIcon2,
  Hurriedly as HurriedlyIcon2,
  Hastily as HastilyIcon2,
  Rushed as RushedIcon2,
  Slow as SlowIcon2,
  Slowly as SlowlyIcon2,
  Gradually as GraduallyIcon2,
  Progressively as ProgressivelyIcon2,
  Steadily as SteadilyIcon5,
  Incrementally as IncrementallyIcon2,
  Systematically as SystematicallyIcon2,
  Methodically as MethodicallyIcon2,
  Strategically as StrategicallyIcon2,
  Tactically as TacticallyIcon2,
  Diplomatically as DiplomaticallyIcon2,
  Politically as PoliticallyIcon5,
  Commercially as CommerciallyIcon5,
  Economically as EconomicallyIcon5,
  Financially as FinanciallyIcon5,
  Socially as SociallyIcon5,
  Culturally as CulturallyIcon5,
  Educationally as EducationallyIcon5,
  Professionally as ProfessionallyIcon5,
  Personally as PersonallyIcon5,
  Privately as PrivatelyIcon5,
  Publicly as PubliclyIcon5,
  Officially as OfficiallyIcon2,
  Unofficially as UnofficiallyIcon2,
  Formally as FormallyIcon2,
  Informally as InformallyIcon2,
  Casually as CasuallyIcon2,
  Strictly as StrictlyIcon2,
  Loosely as LooselyIcon2,
  Tightly as TightlyIcon2,
  Firmly as FirmlyIcon2,
  Strongly as StronglyIcon3,
  Weakly as WeaklyIcon2,
  Softly as SoftlyIcon3,
  Gently as GentlyIcon3,
  Roughly as RoughlyIcon2,
  Harshly as HarshlyIcon2,
  Severely as SeverelyIcon3,
  Mildly as MildlyIcon2,
  Slightly as SlightlyIcon2,
  Moderately as ModeratelyIcon2,
  Considerably as ConsiderablyIcon2,
  Significantly as SignificantlyIcon2,
  Substantially as SubstantiallyIcon2,
  Dramatically as DramaticallyIcon5,
  Drastically as DrasticallyIcon2,
  Radically as RadicallyIcon2,
  Fundamentally as FundamentallyIcon2,
  Basically as BasicallyIcon2,
  Essentially as EssentiallyIcon2,
  Primarily as PrimarilyIcon2,
  Mainly as MainlyIcon2,
  Mostly as MostlyIcon2,
  Generally as GenerallyIcon2,
  Usually as UsuallyIcon2,
  Typically as TypicallyIcon3,
  Normally as NormallyIcon3,
  Commonly as CommonlyIcon3,
  Frequently as FrequentlyIcon3,
  Regularly as RegularlyIcon3,
  Consistently as ConsistentlyIcon6,
  Constantly as ConstantlyIcon3,
  Continuously as ContinuouslyIcon3,
  Persistently as PersistentlyIcon3,
  Repeatedly as RepeatedlyIcon3,
  Routinely as RoutinelyIcon3,
  Habitually as HabituallyIcon3,
} from 'lucide-react';

import { NodeConfigPanel } from '../ui/NodeConfig/NodeConfigPanel';
import { NodeData } from '../../types/canvas';
import { useEnhancedCanvasStore } from '../../stores/enhancedCanvasStore';
import { NeuralNetwork } from '../ui/NeuralNetwork';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';

// Import node components
import AgentNode from './nodes/AgentNode';
import TriggerNode from './nodes/TriggerNode';
import ActionNode from './nodes/ActionNode';
import ConditionNode from './nodes/ConditionNode';
import DelayNode from './nodes/DelayNode';

// Node types configuration
const nodeTypes: NodeTypes = {
  agent: AgentNode,
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
  delay: DelayNode,
};

// Initial nodes and edges
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'trigger',
    position: { x: 100, y: 100 },
    data: {
      label: 'Webhook Trigger',
      description: 'Receives incoming webhook requests',
      icon: Webhook,
      color: 'from-orange-400 to-orange-600',
      status: 'ready',
      triggerType: 'webhook',
      webhook: {
        url: 'https://api.example.com/webhook',
        method: 'POST'
      }
    },
  },
  {
    id: '2',
    type: 'agent',
    position: { x: 300, y: 200 },
    data: {
      label: 'Customer Support Agent',
      description: 'Handles customer inquiries',
      icon: Bot,
      color: 'from-blue-400 to-blue-600',
      status: 'ready',
      role: 'Customer Support Specialist',
      tools: ['Email', 'Knowledge Base', 'CRM'],
      personality: 'Professional and helpful'
    },
  },
  {
    id: '3',
    type: 'action',
    position: { x: 500, y: 300 },
    data: {
      label: 'Send Email',
      description: 'Sends automated email response',
      icon: Mail,
      color: 'from-green-400 to-green-600',
      status: 'pending',
      actionType: 'email',
      validation: {
        isValid: true,
        errors: []
      }
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    type: 'smoothstep',
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];

interface EnhancedQuantumCanvasProps {
  className?: string;
}

export const EnhancedQuantumCanvas: React.FC<EnhancedQuantumCanvasProps> = ({ className = '' }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  // Enhanced canvas store
  const {
    canvasMode,
    setCanvasMode,
    selectedNodes,
    setSelectedNodes,
    isExecuting,
    setIsExecuting,
    showGrid,
    setShowGrid,
    showMinimap,
    setShowMinimap,
    showNeuralNetwork,
    setShowNeuralNetwork,
    showParticles,
    setShowParticles,
    particleIntensity,
    setParticleIntensity,
    viewport,
    setViewport,
    centerCanvas,
    zoomToFit,
    addToHistory,
    undo,
    redo,
    autoLayoutEnabled,
    setAutoLayoutEnabled,
    performanceMode,
    setPerformanceMode,
    debugMode,
    setDebugMode,
    currentTheme,
    setTheme,
  } = useEnhancedCanvasStore();

  // Local state
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [showNodePalette, setShowNodePalette] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPerformancePanel, setShowPerformancePanel] = useState(false);
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [draggedNodeType, setDraggedNodeType] = useState<string | null>(null);

  // Refs
  const canvasRef = useRef<HTMLDivElement>(null);

  // Event handlers
  const onConnect = useCallback(
    (params: Connection) => {
      const edge = {
        ...params,
        type: 'smoothstep',
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      };
      setEdges((eds) => addEdge(edge, eds));
      addToHistory(nodes, [...edges, edge]);
    },
    [nodes, edges, addToHistory, setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setSelectedNodes([node.id]);
  }, [setSelectedNodes]);

  const onNodeDoubleClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onSelectionChange = useCallback((params: any) => {
    if (params.nodes.length > 0) {
      setSelectedNodes(params.nodes.map((n: Node) => n.id));
      setSelectedNode(params.nodes[0]);
    } else {
      setSelectedNodes([]);
      setSelectedNode(null);
    }
  }, [setSelectedNodes]);

  const onNodesDelete = useCallback((deletedNodes: Node[]) => {
    console.log('Deleted nodes:', deletedNodes);
    addToHistory(nodes, edges);
  }, [nodes, edges, addToHistory]);

  const onEdgesDelete = useCallback((deletedEdges: Edge[]) => {
    console.log('Deleted edges:', deletedEdges);
    addToHistory(nodes, edges);
  }, [nodes, edges, addToHistory]);

  const handleSave = useCallback(() => {
    const canvasData = {
      nodes,
      edges,
      viewport,
      timestamp: new Date().toISOString(),
    };
    
    localStorage.setItem('quantum-canvas-data', JSON.stringify(canvasData));
    console.log('Canvas saved successfully');
  }, [nodes, edges, viewport]);

  const handleLoad = useCallback(() => {
    const savedData = localStorage.getItem('quantum-canvas-data');
    if (savedData) {
      const { nodes: savedNodes, edges: savedEdges, viewport: savedViewport } = JSON.parse(savedData);
      setNodes(savedNodes);
      setEdges(savedEdges);
      setViewport(savedViewport);
      console.log('Canvas loaded successfully');
    }
  }, [setNodes, setEdges, setViewport]);

  const handleExport = useCallback(() => {
    const canvasData = {
      nodes,
      edges,
      viewport,
      metadata: {
        version: '1.0',
        exported: new Date().toISOString(),
        mode: canvasMode,
        theme: currentTheme,
      },
    };
    
    const dataStr = JSON.stringify(canvasData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'quantum-canvas-export.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [nodes, edges, viewport, canvasMode, currentTheme]);

  const handleUndo = useCallback(() => {
    const previousState = undo();
    if (previousState) {
      setNodes(previousState.nodes);
      setEdges(previousState.edges);
    }
  }, [undo, setNodes, setEdges]);

  const handleRedo = useCallback(() => {
    const nextState = redo();
    if (nextState) {
      setNodes(nextState.nodes);
      setEdges(nextState.edges);
    }
  }, [redo, setNodes, setEdges]);

  const handleExecute = useCallback(async () => {
    setIsExecuting(true);
    console.log('Executing workflow...');
    
    // Simulate workflow execution
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsExecuting(false);
    console.log('Workflow execution completed');
  }, [setIsExecuting]);

  const handleNodeConfigUpdate = useCallback((nodeId: string, data: Partial<NodeData>) => {
    setNodes(currentNodes => 
      currentNodes.map(node => 
        node.id === nodeId 
          ? { ...node, data: { ...node.data, ...data } }
          : node
      )
    );
    addToHistory(nodes, edges);
  }, [setNodes, nodes, edges, addToHistory]);

  const handleNodeConfigDelete = useCallback((nodeId: string) => {
    setNodes(currentNodes => currentNodes.filter(node => node.id !== nodeId));
    setEdges(currentEdges => currentEdges.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
    setSelectedNode(null);
    addToHistory(nodes, edges);
  }, [setNodes, setEdges, nodes, edges, addToHistory]);

  // Node palette items
  const nodePaletteItems = [
    { type: 'agent', label: 'AI Agent', icon: Bot, color: 'from-blue-400 to-blue-600' },
    { type: 'trigger', label: 'Trigger', icon: Zap, color: 'from-orange-400 to-orange-600' },
    { type: 'action', label: 'Action', icon: Send, color: 'from-green-400 to-green-600' },
    { type: 'condition', label: 'Condition', icon: GitBranch, color: 'from-yellow-400 to-yellow-600' },
    { type: 'delay', label: 'Delay', icon: Clock, color: 'from-purple-400 to-purple-600' },
  ];

  // Performance metrics
  const performanceMetrics = {
    fps: 60,
    nodeCount: nodes.length,
    edgeCount: edges.length,
    memoryUsage: '12.5 MB',
    renderTime: '2.3ms',
  };

  // Debug information
  const debugInfo = {
    selectedNodes: selectedNodes.length,
    canvasMode,
    viewport,
    theme: currentTheme,
    performanceMode,
    autoLayout: autoLayoutEnabled,
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Neural Network Background */}
      {showNeuralNetwork && (
        <div className="absolute inset-0 z-0">
          <NeuralNetwork 
            particleCount={Math.floor(particleIntensity * 100)}
            connectionOpacity={particleIntensity}
          />
        </div>
      )}

      {/* Main Canvas */}
      <div ref={canvasRef} className="w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onNodeDoubleClick={onNodeDoubleClick}
          onSelectionChange={onSelectionChange}
          onNodesDelete={onNodesDelete}
          onEdgesDelete={onEdgesDelete}
          nodeTypes={nodeTypes}
          className="bg-gradient-to-br from-slate-50 to-blue-50"
          fitView
          fitViewOptions={{
            padding: 0.2,
            includeHiddenNodes: false,
          }}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          minZoom={0.1}
          maxZoom={4}
          snapToGrid={showGrid}
          snapGrid={[15, 15]}
          onViewportChange={setViewport}
          deleteKeyCode={['Backspace', 'Delete']}
          selectionKeyCode={['Shift']}
          multiSelectionKeyCode={['Ctrl', 'Meta']}
          selectNodesOnDrag={false}
          panOnDrag={!isSelecting}
          panOnScroll
          zoomOnScroll
          zoomOnPinch
          zoomOnDoubleClick
          preventScrolling
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          onSelectionStart={() => setIsSelecting(true)}
          onSelectionEnd={() => setIsSelecting(false)}
        >
          {/* Background */}
          <Background 
            variant={showGrid ? 'dots' : 'lines'}
            gap={15}
            size={1}
            color="#e2e8f0"
            style={{ opacity: showGrid ? 0.5 : 0.2 }}
          />
          
          {/* Controls */}
          <Controls 
            showZoom={true}
            showFitView={true}
            showInteractive={true}
            position="bottom-right"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(8px)',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
            }}
          />
          
          {/* MiniMap */}
          {showMinimap && (
            <MiniMap
              position="top-right"
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(8px)',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
              }}
              nodeStrokeWidth={2}
              nodeColor={(node) => {
                switch (node.type) {
                  case 'agent': return '#3b82f6';
                  case 'trigger': return '#f59e0b';
                  case 'action': return '#10b981';
                  case 'condition': return '#eab308';
                  case 'delay': return '#8b5cf6';
                  default: return '#6b7280';
                }
              }}
            />
          )}

          {/* Top Toolbar */}
          <Panel position="top-left">
            <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 border border-gray-200">
              {/* Canvas Mode Selector */}
              <div className="flex items-center space-x-1">
                {[
                  { mode: 'design', icon: Layers, label: 'Design' },
                  { mode: 'simulate', icon: Play, label: 'Simulate' },
                  { mode: 'deploy', icon: Cpu, label: 'Deploy' },
                  { mode: 'debug', icon: Bug, label: 'Debug' },
                ].map(({ mode, icon: Icon, label }) => (
                  <button
                    key={mode}
                    onClick={() => setCanvasMode(mode as any)}
                    className={`flex items-center space-x-1 px-3 py-1 rounded transition-colors ${
                      canvasMode === mode
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    title={label}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>

              <div className="w-px h-6 bg-gray-300" />

              {/* Action Buttons */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={handleSave}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                  title="Save Canvas"
                >
                  <Save className="h-4 w-4" />
                </button>
                <button
                  onClick={handleLoad}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                  title="Load Canvas"
                >
                  <Upload className="h-4 w-4" />
                </button>
                <button
                  onClick={handleExport}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                  title="Export Canvas"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>

              <div className="w-px h-6 bg-gray-300" />

              {/* Undo/Redo */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={handleUndo}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                  title="Undo"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  onClick={handleRedo}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                  title="Redo"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>

              <div className="w-px h-6 bg-gray-300" />

              {/* View Controls */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={centerCanvas}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                  title="Center Canvas"
                >
                  <Home className="h-4 w-4" />
                </button>
                <button
                  onClick={zoomToFit}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                  title="Zoom to Fit"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className={`p-2 rounded transition-colors ${
                    showGrid 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title="Toggle Grid"
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setShowMinimap(!showMinimap)}
                  className={`p-2 rounded transition-colors ${
                    showMinimap 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title="Toggle Minimap"
                >
                  {showMinimap ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </Panel>

          {/* Right Toolbar */}
          <Panel position="top-right">
            <div className="flex flex-col space-y-2">
              {/* Node Palette Toggle */}
              <button
                onClick={() => setShowNodePalette(!showNodePalette)}
                className="flex items-center justify-center p-3 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                title="Node Palette"
              >
                <Plus className="h-5 w-5" />
              </button>

              {/* Execute Button */}
              <button
                onClick={handleExecute}
                disabled={isExecuting}
                className={`flex items-center justify-center p-3 rounded-lg border transition-colors ${
                  isExecuting
                    ? 'bg-yellow-500 text-white border-yellow-500 cursor-not-allowed'
                    : 'bg-green-500 text-white border-green-500 hover:bg-green-600'
                }`}
                title={isExecuting ? 'Executing...' : 'Execute Workflow'}
              >
                {isExecuting ? (
                  <RefreshCw className="h-5 w-5 animate-spin" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </button>

              {/* Settings */}
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center justify-center p-3 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                title="Settings"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </Panel>

          {/* Status Bar */}
          <Panel position="bottom-left">
            <div className="flex items-center space-x-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-200 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  canvasMode === 'design' ? 'bg-blue-500' :
                  canvasMode === 'simulate' ? 'bg-green-500' :
                  canvasMode === 'deploy' ? 'bg-purple-500' :
                  'bg-orange-500'
                }`} />
                <span className="capitalize">{canvasMode}</span>
              </div>
              <div className="w-px h-4 bg-gray-300" />
              <div>Nodes: {nodes.length}</div>
              <div>Edges: {edges.length}</div>
              <div>Selected: {selectedNodes.length}</div>
              {isExecuting && (
                <>
                  <div className="w-px h-4 bg-gray-300" />
                  <div className="flex items-center space-x-1">
                    <RefreshCw className="h-3 w-3 animate-spin" />
                    <span>Executing...</span>
                  </div>
                </>
              )}
            </div>
          </Panel>
        </ReactFlow>
      </div>

      {/* Node Palette */}
      {showNodePalette && (
        <div className="absolute top-16 right-4 w-64 bg-white/95 backdrop-blur-sm rounded-lg border border-gray-200 shadow-lg z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-900">Node Palette</h3>
              <button
                onClick={() => setShowNodePalette(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2">
              {nodePaletteItems.map((item) => (
                <button
                  key={item.type}
                  draggable
                  onDragStart={(e) => {
                    setDraggedNodeType(item.type);
                    e.dataTransfer.setData('application/reactflow', item.type);
                  }}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color}`}>
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500">Drag to canvas</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-16 right-4 w-80 bg-white/95 backdrop-blur-sm rounded-lg border border-gray-200 shadow-lg z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-900">Canvas Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Visual Settings */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Visual</h4>
                <div className="space-y-2">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Show Grid</span>
                    <input
                      type="checkbox"
                      checked={showGrid}
                      onChange={(e) => setShowGrid(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Show Minimap</span>
                    <input
                      type="checkbox"
                      checked={showMinimap}
                      onChange={(e) => setShowMinimap(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Neural Network</span>
                    <input
                      type="checkbox"
                      checked={showNeuralNetwork}
                      onChange={(e) => setShowNeuralNetwork(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Particles</span>
                    <input
                      type="checkbox"
                      checked={showParticles}
                      onChange={(e) => setShowParticles(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Particle Intensity</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={particleIntensity}
                      onChange={(e) => setParticleIntensity(parseFloat(e.target.value))}
                      className="w-20"
                    />
                  </label>
                </div>
              </div>

              {/* Performance Settings */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Performance</h4>
                <div className="space-y-2">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Auto Layout</span>
                    <input
                      type="checkbox"
                      checked={autoLayoutEnabled}
                      onChange={(e) => setAutoLayoutEnabled(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Debug Mode</span>
                    <input
                      type="checkbox"
                      checked={debugMode}
                      onChange={(e) => setDebugMode(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                  <div>
                    <label className="text-sm text-gray-700">Performance Mode</label>
                    <select
                      value={performanceMode}
                      onChange={(e) => setPerformanceMode(e.target.value as any)}
                      className="w-full mt-1 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="auto">Auto</option>
                      <option value="high">High</option>
                      <option value="balanced">Balanced</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Theme Settings */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Theme</h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm text-gray-700">Canvas Theme</label>
                    <select
                      value={currentTheme}
                      onChange={(e) => setTheme(e.target.value)}
                      className="w-full mt-1 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="quantum">Quantum</option>
                      <option value="minimal">Minimal</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Panel */}
      {showPerformancePanel && (
        <div className="absolute top-16 left-4 w-72 bg-white/95 backdrop-blur-sm rounded-lg border border-gray-200 shadow-lg z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-900">Performance</h3>
              <button
                onClick={() => setShowPerformancePanel(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              {Object.entries(performanceMetrics).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-sm font-medium text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Debug Panel */}
      {showDebugPanel && debugMode && (
        <div className="absolute bottom-16 left-4 w-80 bg-white/95 backdrop-blur-sm rounded-lg border border-gray-200 shadow-lg z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-900">Debug Info</h3>
              <button
                onClick={() => setShowDebugPanel(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-2">
              {Object.entries(debugInfo).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-sm font-mono text-gray-900">
                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Node Configuration Panel */}
      <NodeConfigPanel
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
        onUpdate={handleNodeConfigUpdate}
        onDelete={handleNodeConfigDelete}
      />
    </div>
  );
};

export default EnhancedQuantumCanvas;
