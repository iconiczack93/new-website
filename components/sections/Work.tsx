import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DraftingCompass, Gem, ArrowUpRight, Search, Copy, Check, X, FileText, Scan, Sparkles, Trash2, MapPin, Briefcase, Code2, AlertCircle, Filter } from 'lucide-react';
import { Project } from '../../types';

const projects: Project[] = [
  {
    id: 'framework',
    title: 'FRAMEWORK',
    type: 'extension',
    description: 'AI-powered talent architecture engine. Generates comprehensive org charts and tech stack analysis in 8 seconds, saving you the research of building talent maps.',
    tech: ['React', 'TypeScript', 'Gemini API', 'Zod'],
    stats: [
      { label: 'Speed', value: '8s Gen' },
      { label: 'Impact', value: 'Instant Maps' }
    ],
    color: 'from-gray-500/20 to-slate-500/20',
    link: '#',
    screenshot: '/framework-screenshot-v3.png'
  },
  {
    id: 'prism',
    title: 'PRISM',
    type: 'extension',
    description: 'AI candidate evaluation engine. Predicts visa sponsorship eligibility and technical fit with estimated 95% accuracy, eliminating 20 hours of manual screening weekly.*',
    tech: ['Claude API', 'Algorithms', 'Plasmo'],
    stats: [
      { label: 'Processing', value: 'Algorithmic' },
      { label: 'Efficiency', value: '99.9%' }
    ],
    color: 'from-gray-500/20 to-slate-500/20',
    link: '#',
    screenshot: '/prism-screenshot-v3.png'
  },
  {
    id: 'boolean',
    title: 'LENS',
    type: 'tool',
    description: 'Since you\'re here checking out my work... want a Boolean for the road? Perfect search strings, on the house.',
    tech: ['React', 'TypeScript', 'Frontend'],
    stats: [], // Custom render
    color: 'from-gray-500/20 to-slate-500/20',
    link: '#',
    screenshot: '/boolean-screenshot.png'
  }
];

const iconMap: Record<string, React.ReactNode> = {
  'framework': <DraftingCompass size={48} strokeWidth={1.5} />,
  'prism': <Gem size={48} strokeWidth={1.5} />,
  'boolean': <Search size={32} strokeWidth={1.5} />,
};

// --- DICTIONARIES ---

const SKILL_VARIATIONS: Record<string, string[]> = {
  // Frontend
  'React': ['React', 'ReactJS', 'React.js'],
  'Next.js': ['Next.js', 'NextJS', 'Next'],
  'Vue': ['Vue', 'Vue.js', 'VueJS'],
  'Nuxt': ['Nuxt', 'Nuxt.js', 'NuxtJS'],
  'Angular': ['Angular', 'AngularJS'],
  'Svelte': ['Svelte', 'SvelteKit'],
  'Remix': ['Remix', 'Remix.run'],
  'Vite': ['Vite', 'ViteJS'],
  'Webpack': ['Webpack'],
  'Tailwind CSS': ['Tailwind', 'TailwindCSS', 'Tailwind CSS'],
  'Redux': ['Redux'],
  'JavaScript': ['JavaScript', 'JS', 'ES6', 'ES2015', 'ECMAScript'],
  'TypeScript': ['TypeScript', 'TS'],
  'HTML': ['HTML', 'HTML5'],
  'CSS': ['CSS', 'CSS3'],
  'SASS': ['SASS', 'SCSS'],
  
  // Backend
  'Node': ['Node', 'NodeJS', 'Node.js'],
  'Express': ['Express', 'ExpressJS', 'Express.js'],
  'FastAPI': ['FastAPI'],
  'Django': ['Django'],
  'Flask': ['Flask'],
  'Spring Boot': ['Spring Boot', 'Spring'],
  'Laravel': ['Laravel'],
  'Ruby on Rails': ['Rails', 'Ruby on Rails'],
  
  // Languages
  'Python': ['Python', 'Python 3', 'Py3'],
  'Java': ['Java', 'JVM'],
  'Go': ['Go', 'Golang'],
  'Rust': ['Rust'],
  'C++': ['C++', 'Cpp', 'C plus plus'],
  'C#': ['C#', 'CSharp', '.NET', 'C Sharp'],
  'Ruby': ['Ruby'],
  'PHP': ['PHP'],
  'Swift': ['Swift'],
  'Kotlin': ['Kotlin'],
  'Scala': ['Scala'],
  'R': ['R programming', 'R language'],
  
  // Databases
  'PostgreSQL': ['PostgreSQL', 'Postgres', 'POSTGRESQL'],
  'MySQL': ['MySQL', 'MYSQL'],
  'MariaDB': ['MariaDB'],
  'MongoDB': ['MongoDB', 'Mongo'],
  'Redis': ['Redis'],
  'DynamoDB': ['DynamoDB', 'Dynamo DB'],
  'Cassandra': ['Cassandra'],
  'Elasticsearch': ['Elasticsearch', 'Elastic Search'],
  'SQL': ['SQL'],
  
  // Cloud & Infrastructure
  'AWS': ['AWS', 'Amazon Web Services'],
  'GCP': ['GCP', 'Google Cloud Platform', 'Google Cloud'],
  'Azure': ['Azure', 'Microsoft Azure'],
  'Cloudflare': ['Cloudflare'],
  'Heroku': ['Heroku'],
  'DigitalOcean': ['DigitalOcean', 'Digital Ocean'],
  'Docker': ['Docker', 'Containerization'],
  'Kubernetes': ['Kubernetes', 'K8s'],
  'Terraform': ['Terraform', 'IaC', 'Infrastructure as Code'],
  
  // DevOps & Tools
  'Jenkins': ['Jenkins'],
  'GitLab CI': ['GitLab CI', 'GitLab'],
  'GitHub Actions': ['GitHub Actions'],
  'Jira': ['Jira'],
  'Figma': ['Figma'],
  'Postman': ['Postman'],
  'Datadog': ['Datadog'],
  'Sentry': ['Sentry'],
  'Linux': ['Linux', 'Unix'],
  'Git': ['Git', 'Version Control'],
  
  // APIs & Protocols
  'GraphQL': ['GraphQL'],
  'REST': ['REST', 'RESTful', 'REST API', 'RESTful API'],
  'gRPC': ['gRPC'],
  'WebSocket': ['WebSocket', 'WebSockets'],
  
  // Testing
  'Jest': ['Jest'],
  'Cypress': ['Cypress'],
  'Selenium': ['Selenium'],
  'Playwright': ['Playwright']
};

const ROLE_VARIATIONS: Record<string, string[]> = {
  'Software Engineer': ['Software Engineer', 'SWE', 'Software Developer', 'SDE', 'Developer', 'Programmer'],
  'Frontend Engineer': ['Frontend Engineer', 'Front-end Engineer', 'Front End Engineer', 'FE Engineer', 'Frontend Developer', 'UI Engineer'],
  'Backend Engineer': ['Backend Engineer', 'Back-end Engineer', 'Back End Engineer', 'BE Engineer', 'Backend Developer', 'Server Engineer'],
  'Full Stack Engineer': ['Full Stack Engineer', 'Full-Stack Engineer', 'Fullstack Engineer', 'Full Stack Developer', 'Fullstack Developer'],
  'Mobile Engineer': ['Mobile Engineer', 'Mobile Developer'],
  'iOS Engineer': ['iOS Engineer', 'iOS Developer'],
  'Android Engineer': ['Android Engineer', 'Android Developer'],
  'DevOps Engineer': ['DevOps Engineer', 'DevOps'],
  'Site Reliability Engineer': ['Site Reliability Engineer', 'SRE'],
  'Platform Engineer': ['Platform Engineer', 'Infrastructure Engineer'],
  'Data Engineer': ['Data Engineer'],
  'Data Scientist': ['Data Scientist', 'DS'],
  'Machine Learning Engineer': ['ML Engineer', 'Machine Learning Engineer', 'AI Engineer'],
  'Security Engineer': ['Security Engineer', 'Cybersecurity Engineer', 'InfoSec Engineer'],
  'QA Engineer': ['QA Engineer', 'Quality Assurance', 'SDET', 'Test Engineer'],
  'Product Manager': ['Product Manager', 'PM'],
  'Engineering Manager': ['Engineering Manager', 'EM', 'Eng Manager'],
  'Tech Lead': ['Tech Lead', 'Technical Lead', 'Team Lead'],
  'Solutions Architect': ['Solutions Architect', 'Software Architect', 'System Architect'],
  'UI/UX Designer': ['UI/UX Designer', 'UX/UI Designer', 'Product Designer', 'User Experience Designer'],
  'Graphic Designer': ['Graphic Designer', 'Visual Designer']
};

const LOCATION_VARIATIONS: Record<string, string[]> = {
  'San Francisco': ['San Francisco', 'SF', 'SF Bay Area', 'Bay Area', 'San Francisco Bay Area', 'Silicon Valley'],
  'New York': ['New York', 'NYC', 'New York City', 'Manhattan', 'Brooklyn', 'Queens', 'Bronx'],
  'Los Angeles': ['Los Angeles', 'LA', 'Greater Los Angeles', 'Hollywood', 'Santa Monica'],
  'Seattle': ['Seattle', 'Greater Seattle Area', 'Bellevue', 'Redmond'],
  'Austin': ['Austin', 'ATX', 'Greater Austin'],
  'Boston': ['Boston', 'Greater Boston', 'Cambridge', 'Somerville'],
  'Chicago': ['Chicago', 'Greater Chicago', 'Chicagoland'],
  'Denver': ['Denver', 'Boulder', 'Colorado'],
  'Atlanta': ['Atlanta', 'Georgia'],
  'Miami': ['Miami', 'Florida', 'South Florida'],
  'Portland': ['Portland', 'Oregon'],
  'Phoenix': ['Phoenix', 'Arizona', 'Scottsdale'],
  'Dallas': ['Dallas', 'Texas', 'DFW'],
  'Houston': ['Houston', 'Texas'],
  'Philadelphia': ['Philadelphia', 'Philly', 'Pennsylvania'],
  'Washington DC': ['Washington DC', 'DC', 'Washington D.C.', 'DMV area'],
  'Remote': ['Remote', 'Work from Home', 'WFH', 'Distributed', 'Anywhere', 'Virtual'],
  'London': ['London', 'Greater London', 'UK'],
  'Toronto': ['Toronto', 'GTA', 'Ontario', 'Canada'],
  'Vancouver': ['Vancouver', 'British Columbia', 'BC'],
  'Berlin': ['Berlin', 'Germany'],
  'Amsterdam': ['Amsterdam', 'Netherlands'],
  'Paris': ['Paris', 'France'],
  'Dublin': ['Dublin', 'Ireland'],
  'Tel Aviv': ['Tel Aviv', 'Israel'],
  'Singapore': ['Singapore'],
  'Sydney': ['Sydney', 'Australia'],
  'Melbourne': ['Melbourne', 'Australia']
};

const TECH_KEYWORDS = Object.keys(SKILL_VARIATIONS);
const ROLE_KEYWORDS = Object.keys(ROLE_VARIATIONS);
const SENIORITY_KEYWORDS = {
  'Junior': ['Junior', 'Jr', 'Jr.', 'Entry-level', 'Entry level', 'Associate'],
  'Mid-level': ['Mid-level', 'Mid level', 'Intermediate'],
  'Senior': ['Senior', 'Sr', 'Sr.'],
  'Staff': ['Staff'],
  'Principal': ['Principal'],
  'Lead': ['Lead', 'Team Lead', 'Tech Lead', 'Technical Lead'],
  'Manager': ['Manager', 'Engineering Manager', 'EM'],
  'Director': ['Director', 'Head of', 'VP', 'Vice President'],
  'Executive': ['Chief', 'CTO', 'CEO', 'CPO']
};

const EXCLUDE_TERMS = [
  // Company names that might match tech terms
  'Google', 'Amazon', 'Microsoft', 'Apple', 'Meta', 'Facebook', 'Netflix', 'Tesla',
  // Generic words
  'experience', 'years', 'team', 'work', 'build', 'develop', 'create', 'manage',
  'strong', 'excellent', 'good', 'knowledge', 'skills', 'ability', 'understanding',
  // Location false positives
  'Java island', 'Turkey country', 'Georgia state'
];

const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const createSafeRegex = (keyword: string) => {
  const escaped = escapeRegExp(keyword);
  const start = /^\w/.test(keyword) ? '\\b' : '';
  const end = /\w$/.test(keyword) ? '\\b' : '';
  return new RegExp(`${start}${escaped}${end}`, 'i');
};

// --- BOOLEAN TOOL COMPONENT ---

const BooleanTool: React.FC<{ onFocus: () => void, onBlur: () => void }> = ({ onFocus, onBlur }) => {
    const [mode, setMode] = useState<'build' | 'analyze'>('build');
    const [showExclude, setShowExclude] = useState(false);
    
    // Builder State
    const [role, setRole] = useState('');
    const [skillInput, setSkillInput] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [excludeInput, setExcludeInput] = useState('');
    const [excludeTerms, setExcludeTerms] = useState<string[]>([]);
    const [location, setLocation] = useState('');
    const [generated, setGenerated] = useState('');
    const [copied, setCopied] = useState(false);

    // Analyzer State
    const [jdText, setJdText] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [scanLog, setScanLog] = useState<string[]>([]);
    const [scanProgress, setScanProgress] = useState(0);
    const [usedAI, setUsedAI] = useState(false);

    const addSkill = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            if(skillInput.trim()) {
                setSkills([...skills, skillInput.trim()]);
                setSkillInput('');
            }
        }
    };

    const addExcludeTerm = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            if(excludeInput.trim()) {
                setExcludeTerms([...excludeTerms, excludeInput.trim()]);
                setExcludeInput('');
            }
        }
    };

    const extractSkills = (text: string): string[] => {
        const foundSkills = new Set<string>();
        const lowerText = text.toLowerCase();
        
        // Check each skill and its variations
        Object.entries(SKILL_VARIATIONS).forEach(([skill, variations]) => {
            const hasSkill = variations.some(variation => {
                // Create regex that matches the skill in context
                const patterns = [
                    // Exact match with word boundaries
                    new RegExp(`\\b${escapeRegExp(variation)}\\b`, 'i'),
                    // Match in experience context (e.g., "5+ years of Python")
                    new RegExp(`\\b\\d+\\+?\\s*years?\\s+(?:of\\s+)?${escapeRegExp(variation)}`, 'i'),
                    new RegExp(`${escapeRegExp(variation)}\\s+experience`, 'i'),
                    // Match in requirements/skills lists
                    new RegExp(`[-•*]\\s*${escapeRegExp(variation)}`, 'i')
                ];
                
                return patterns.some(pattern => pattern.test(text));
            });
            
            if (hasSkill && !EXCLUDE_TERMS.some(exclude => 
                skill.toLowerCase().includes(exclude.toLowerCase())
            )) {
                foundSkills.add(skill);
            }
        });
        
        return Array.from(foundSkills);
    };
    
    const extractRole = (text: string): { role: string; seniority: string } => {
        let bestRole = '';
        let bestSeniority = '';
        
        // FIRST: Try to find the actual job title (usually in first 500 chars)
        const topOfDoc = text.substring(0, 500);
        const lines = topOfDoc.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        
        // Look for title patterns (these are usually the actual job title)
        const titlePatterns = [
            // "Position: Staff Software Engineer"
            /(?:position|role|title|job title):\s*(.+)/i,
            // First substantial line that looks like a title
            /^((?:junior|mid-level|senior|staff|principal|lead|head of|vp|director|chief)?\s*(?:software|frontend|backend|full stack|mobile|devops|platform|data|ml|security|qa|product).+?engineer|developer|manager|architect|designer)/i
        ];
        
        for (const line of lines) {
            for (const pattern of titlePatterns) {
                const match = line.match(pattern);
                if (match) {
                    const title = match[1] || match[0];
                    
                    // Extract seniority from title
                    const seniorityMatch = title.match(/\b(junior|jr\.?|mid-level|senior|sr\.?|staff|principal|lead|manager|director|head of|vp|chief)\b/i);
                    if (seniorityMatch) {
                        const seniority = seniorityMatch[1].toLowerCase();
                        if (seniority.includes('junior') || seniority.includes('jr')) bestSeniority = 'Junior';
                        else if (seniority.includes('mid')) bestSeniority = 'Mid-level';
                        else if (seniority.includes('senior') || seniority.includes('sr')) bestSeniority = 'Senior';
                        else if (seniority.includes('staff')) bestSeniority = 'Staff';
                        else if (seniority.includes('principal')) bestSeniority = 'Principal';
                        else if (seniority.includes('lead')) bestSeniority = 'Lead';
                        else if (seniority.includes('manager')) bestSeniority = 'Manager';
                        else if (seniority.includes('director') || seniority.includes('head')) bestSeniority = 'Director';
                        else if (seniority.includes('vp') || seniority.includes('chief')) bestSeniority = 'Executive';
                    }
                    
                    // Extract base role from title
                    const roleMatch = title.match(/\b(software|frontend|backend|full stack|mobile|devops|platform|data|ml|machine learning|security|qa|product)\s+(?:engineer|developer|manager|architect|designer)/i);
                    if (roleMatch) {
                        bestRole = roleMatch[0];
                        return { role: bestRole, seniority: bestSeniority };
                    }
                }
            }
        }
        
        // FALLBACK: If no title found, do broader search but be more careful
        let bestScore = 0;
        
        // Find role with scoring (prefer more specific roles)
        Object.entries(ROLE_VARIATIONS).forEach(([role, variations]) => {
            variations.forEach(variation => {
                if (createSafeRegex(variation).test(text)) {
                    // Score based on specificity (longer = more specific)
                    const score = variation.length;
                    if (score > bestScore) {
                        bestRole = role;
                        bestScore = score;
                    }
                }
            });
        });
        
        // If no specific role found but we have seniority, default to Engineer
        if (!bestRole && bestSeniority) {
            bestRole = 'Software Engineer';
        }
        
        return { role: bestRole, seniority: bestSeniority };
    };
    
    const extractLocation = (text: string): string => {
        let bestLocation = '';
        let bestScore = 0;
        
        Object.entries(LOCATION_VARIATIONS).forEach(([location, variations]) => {
            variations.forEach(variation => {
                const patterns = [
                    new RegExp(`Location:?\\s*${escapeRegExp(variation)}`, 'i'),
                    new RegExp(`Based in\\s+${escapeRegExp(variation)}`, 'i'),
                    new RegExp(`\\b${escapeRegExp(variation)}\\b`, 'i')
                ];
                
                if (patterns.some(pattern => pattern.test(text))) {
                    const score = variation.length;
                    if (score > bestScore) {
                        bestLocation = location;
                        bestScore = score;
                    }
                }
            });
        });
        
        return bestLocation;
    };
    
    const showToast = (message: string) => {
        // Create a simple toast notification
        const toast = document.createElement('div');
        toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-20px)';
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    };

    const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || file.type !== 'application/pdf') {
            showToast('⚠️ Please select a valid PDF file');
            return;
        }

        try {
            showToast('📄 Processing PDF...');
            
            // Read the file as text using FileReader
            const reader = new FileReader();
            
            reader.onload = async (event) => {
                const arrayBuffer = event.target?.result as ArrayBuffer;
                
                // Use PDF.js from CDN to extract text
                const loadingTask = (window as any).pdfjsLib.getDocument({ data: arrayBuffer });
                const pdf = await loadingTask.promise;
                
                let fullText = '';
                
                // Extract text from all pages
                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    const page = await pdf.getPage(pageNum);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map((item: any) => item.str).join(' ');
                    fullText += pageText + '\n';
                }
                
                // Set the extracted text AND auto-analyze with AI
                setJdText(fullText.trim());
                showToast('✓ PDF extracted! Analyzing with AI...');
                
                // Automatically trigger AI analysis
                await analyzeWithAI(fullText.trim());
                
                // Reset the file input
                e.target.value = '';
            };
            
            reader.onerror = () => {
                showToast('❌ Error reading PDF file');
                e.target.value = '';
            };
            
            reader.readAsArrayBuffer(file);
            
        } catch (error) {
            console.error('PDF processing error:', error);
            showToast('❌ Error processing PDF. Try copy/paste instead.');
            e.target.value = '';
        }
    };

    const analyzeWithAI = async (text: string) => {
        try {
            // API key should be set as environment variable VITE_GEMINI_API_KEY
            const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
            const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash';
            const GEMINI_API_VERSION = import.meta.env.VITE_GEMINI_API_VERSION || 'v1';
            
            console.log('🔑 API Key loaded:', GEMINI_API_KEY ? `${GEMINI_API_KEY.substring(0, 10)}...` : 'MISSING');
            
            if (!GEMINI_API_KEY) {
                console.error('❌ No API key found in environment variables');
                showToast('⚠️ API key not configured. Using fallback parsing...');
                // Fallback to regex parsing
                setUsedAI(false);
                const foundSkills = extractSkills(text);
                const { role: foundRole, seniority } = extractRole(text);
                const foundLocation = extractLocation(text);
                
                setSkills(foundSkills);
                const finalRole = seniority && foundRole ? 
                    (foundRole.includes(seniority) ? foundRole : `${seniority} ${foundRole}`) : 
                    foundRole || '';
                setRole(finalRole);
                if (foundLocation) setLocation(foundLocation);
                
                const parts = [];
                if (finalRole) parts.push(finalRole);
                if (foundSkills.length > 0) parts.push(`${foundSkills.length} skills`);
                if (foundLocation) parts.push(foundLocation);
                
                if (parts.length > 0) {
                    showToast(`✓ Found: ${parts.join(', ')}`);
                } else {
                    showToast('⚠️ No clear matches found');
                }
                setMode('build');
                return;
            }
            
            console.log(`🌐 Gemini model: ${GEMINI_MODEL} via ${GEMINI_API_VERSION}`);
            console.log('🤖 Calling Gemini API...');
            const response = await fetch(`https://generativelanguage.googleapis.com/${GEMINI_API_VERSION}/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `Extract job details from this job description. Return ONLY valid JSON with this exact structure:
{
  "role": "exact job title",
  "seniority": "Junior|Mid-level|Senior|Staff|Principal|Lead|Manager|Director|Executive or empty string",
  "skills": ["skill1", "skill2"],
  "location": "city name or Remote or empty string"
}

Rules:
- role: Extract the ACTUAL job title (e.g., "Staff Software Engineer", "Senior Frontend Engineer")
- seniority: Extract ONLY if explicitly stated in the title
- skills: Only technical skills (languages, frameworks, tools) - no soft skills
- location: City name, "Remote", or empty string
- Return empty strings/arrays if not found
- DO NOT include any text outside the JSON

Job Description:
${text}`
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.1,
                        maxOutputTokens: 500
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('❌ API Error:', errorData);
                
                if (response.status === 404) {
                    console.error(`Model "${GEMINI_MODEL}" may not be enabled for API version "${GEMINI_API_VERSION}".`);
                    showToast('⚠️ Selected Gemini model is unavailable. Check API access.');
                }
                throw new Error(`API returned ${response.status}: ${JSON.stringify(errorData)}`);
            }

            const data = await response.json();
            console.log('✓ API Response:', data);
            
            if (!data.candidates || !data.candidates[0]) {
                throw new Error('No candidates in API response');
            }
            
            const aiResponse = data.candidates[0].content.parts[0].text;
            console.log('✓ AI Text:', aiResponse);
            
            // Parse the JSON response
            const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                console.log('✓ Parsed:', parsed);
                
                // Auto-populate the form
                if (parsed.role) setRole(parsed.role);
                if (parsed.skills && Array.isArray(parsed.skills)) setSkills(parsed.skills);
                if (parsed.location) setLocation(parsed.location);
                
                // Show success message
                const parts = [];
                if (parsed.role) parts.push(parsed.role);
                if (parsed.skills?.length) parts.push(`${parsed.skills.length} skills`);
                if (parsed.location) parts.push(parsed.location);
                
                showToast(`✓ AI Parsed: ${parts.join(', ')}`);
                setUsedAI(true);
                setMode('build'); // Switch to build mode to show results
            } else {
                throw new Error('Invalid AI response format');
            }
            
        } catch (error) {
            console.error('❌ AI analysis error:', error);
            showToast('⚠️ AI parsing failed. Please review and adjust manually.');
            // Don't leave the user hanging - at least try regex fallback
            try {
                const foundSkills = extractSkills(text);
                const { role: foundRole, seniority } = extractRole(text);
                const foundLocation = extractLocation(text);
                
                if (foundSkills.length > 0 || foundRole) {
                    setSkills(foundSkills);
                    const finalRole = seniority && foundRole ? 
                        (foundRole.includes(seniority) ? foundRole : `${seniority} ${foundRole}`) : 
                        foundRole || '';
                    setRole(finalRole);
                    if (foundLocation) setLocation(foundLocation);
                    setMode('build');
                }
            } catch (fallbackError) {
                console.error('❌ Fallback also failed:', fallbackError);
            }
        }
    };

    const runAnalysis = async () => {
        if (!jdText.trim()) return;
        setIsScanning(true);
        setScanProgress(0);
        setScanLog(['Connecting to AI...']);

        const sequence = [
            { t: 300, msg: 'Analyzing job description...', p: 30 },
            { t: 800, msg: 'Extracting key details...', p: 60 },
            { t: 1200, msg: 'Parsing complete...', p: 90 },
        ];

        sequence.forEach(({ t, msg, p }) => {
            setTimeout(() => {
                setScanLog(prev => [...prev.slice(-3), msg]);
                setScanProgress(p);
            }, t);
        });

        // Use AI to parse
        await analyzeWithAI(jdText);
        
        setTimeout(() => {
            setIsScanning(false);
        }, 1400);
    };

    const clearForm = () => {
        setRole('');
        setSkillInput('');
        setSkills([]);
        setExcludeInput('');
        setExcludeTerms([]);
        setLocation('');
        setGenerated('');
        setJdText('');
        setScanLog([]);
        setIsScanning(false);
    };

    useEffect(() => {
        const parts = [];

        if (role) {
             const roleKey = Object.keys(ROLE_VARIATIONS).find(k => k.toLowerCase() === role.toLowerCase()) || role;
             const variations = ROLE_VARIATIONS[roleKey] || [role];
             parts.push(`(${variations.map(r => `"${r}"`).join(' OR ')})`);
        }

        if (skills.length) {
            const skillGroups = skills.map(skill => {
                const skillKey = Object.keys(SKILL_VARIATIONS).find(k => k.toLowerCase() === skill.toLowerCase()) || skill;
                const variations = SKILL_VARIATIONS[skillKey] || [skill];
                return `(${variations.map(v => v.includes(' ') ? `"${v}"` : v).join(' OR ')})`;
            });
            parts.push(`AND ${skillGroups.join(' AND ')}`);
        }

        if (location) {
             const locKey = Object.keys(LOCATION_VARIATIONS).find(k => k.toLowerCase() === location.toLowerCase()) || location;
             const variations = LOCATION_VARIATIONS[locKey] || [location, `Greater ${location}`];
             parts.push(`AND (${variations.map(l => `"${l}"`).join(' OR ')})`);
        }

        if (excludeTerms.length) {
            parts.push(`NOT (${excludeTerms.map(t => `"${t}"`).join(' OR ')})`);
        }
        
        setGenerated(parts.join(' ') || 'Your Boolean search string will appear here...');
    }, [role, skills, location, excludeTerms]);

    const copyToClipboard = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(generated);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const exportAsJSON = () => {
        const data = { role, skills, location, excludeTerms, booleanString: generated };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `boolean-${role.replace(/\s+/g, '-').toLowerCase()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const exportAsCSV = () => {
        const escapeCSV = (str: string) => str.replace(/"/g, '""');
        const csv = `Role,Skills,Location,Boolean String\n"${escapeCSV(role)}","${escapeCSV(skills.join('; '))}","${escapeCSV(location)}","${escapeCSV(generated)}"`;
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `boolean-${role.replace(/\s+/g, '-').toLowerCase()}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const runSearch = (platform: 'linkedin' | 'google') => {
        const query = encodeURIComponent(generated);
        const url = platform === 'linkedin' 
            ? `https://www.linkedin.com/search/results/people/?keywords=${query}`
            : `https://www.google.com/search?q=site:linkedin.com/in/ ${query}`;
        window.open(url, '_blank');
    };

    return (
        <div className="mt-2 bg-zinc-50/50 dark:bg-black/50 rounded-xl border border-zinc-200 dark:border-white/10 font-sans flex flex-col pointer-events-auto relative overflow-hidden shadow-inner h-auto"
             onMouseEnter={onFocus} 
             onMouseLeave={onBlur}
        >
            {/* Minimal Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-200 dark:border-white/5 bg-zinc-100/50 dark:bg-white/5 shrink-0">
                <div className="flex gap-1 p-0.5 bg-zinc-200 dark:bg-white/5 rounded-lg">
                    <button 
                        onClick={() => setMode('build')}
                        className={`text-[10px] font-mono uppercase px-3 py-1 rounded-md transition-all ${mode === 'build' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:text-gray-500 dark:hover:text-white'}`}
                    >
                        Build
                    </button>
                    <button 
                        onClick={() => setMode('analyze')}
                        className={`text-[10px] font-mono uppercase px-3 py-1 rounded-md transition-all flex items-center gap-1 ${mode === 'analyze' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:text-gray-500 dark:hover:text-white'}`}
                    >
                        Extract
                    </button>
                </div>
                <button onClick={clearForm} className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors" title="Clear">
                    <Trash2 size={12} />
                </button>
            </div>

            {/* SCANNING OVERLAY */}
            <AnimatePresence>
                {isScanning && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 bg-zinc-900/95 flex flex-col items-center justify-center p-8 font-mono"
                    >
                        <div className="w-full max-w-[200px] space-y-4">
                            <div className="flex items-center justify-between text-xs text-green-400 mb-1">
                                <span>ANALYSIS_PROTOCOL</span>
                                <span>{scanProgress}%</span>
                            </div>
                            <div className="h-1 w-full bg-gray-800 rounded overflow-hidden">
                                <motion.div 
                                    className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${scanProgress}%` }}
                                />
                            </div>
                            <div className="h-20 overflow-hidden text-[10px] text-gray-500 space-y-1 border-l border-gray-700 pl-2">
                                {scanLog.map((log, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                                        {'>'} {log}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="p-3 flex-1 flex flex-col gap-2 overflow-visible h-auto">
                {mode === 'build' ? (
                    <>
                         <div className="flex gap-2">
                            <div className="flex-1 bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-lg flex items-center px-2 py-1.5 focus-within:border-purple-500/50 focus-within:ring-1 focus-within:ring-purple-500/20 transition-all">
                                <Briefcase size={12} className="text-zinc-400 mr-2 shrink-0" />
                                <input 
                                    className="w-full bg-transparent text-xs text-zinc-900 dark:text-white placeholder-zinc-400 outline-none"
                                    placeholder="Role (e.g. SWE)"
                                    value={role}
                                    onChange={e => setRole(e.target.value)}
                                />
                            </div>
                            <div className="flex-1 bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-lg flex items-center px-2 py-1.5 focus-within:border-purple-500/50 focus-within:ring-1 focus-within:ring-purple-500/20 transition-all">
                                <MapPin size={12} className="text-zinc-400 mr-2 shrink-0" />
                                <input 
                                    className="w-full bg-transparent text-xs text-zinc-900 dark:text-white placeholder-zinc-400 outline-none"
                                    placeholder="Location"
                                    value={location}
                                    onChange={e => setLocation(e.target.value)}
                                />
                            </div>
                        </div>
                        
                        <div className="bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-lg px-2 py-1.5 min-h-[40px] focus-within:border-purple-500/50 transition-all">
                             <div className="flex flex-wrap gap-1.5">
                                <div className="flex items-center gap-2 text-zinc-400 select-none">
                                    <Code2 size={12} />
                                </div>
                                {skills.map((s, i) => (
                                    <span key={i} className="text-[10px] bg-purple-500/10 text-purple-600 dark:text-purple-300 px-1.5 py-0.5 rounded flex items-center gap-1 border border-purple-500/20">
                                        {s} <button onClick={() => setSkills(skills.filter((_, idx) => idx !== i))} className="hover:text-purple-800"><X size={8}/></button>
                                    </span>
                                ))}
                                <input 
                                    className="bg-transparent text-xs outline-none flex-1 min-w-[60px] text-zinc-900 dark:text-white placeholder-zinc-400"
                                    placeholder={skills.length ? "" : "Skills (React, Python...)"}
                                    value={skillInput}
                                    onChange={e => setSkillInput(e.target.value)}
                                    onKeyDown={addSkill}
                                />
                            </div>
                        </div>

                         {showExclude ? (
                            <div className="bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-lg px-2 py-1.5 min-h-[35px] max-h-[60px] overflow-y-auto animate-in slide-in-from-top-2">
                                <div className="flex flex-wrap gap-1.5">
                                    <div className="flex items-center gap-2 text-zinc-400 select-none">
                                        <AlertCircle size={12} />
                                    </div>
                                    {excludeTerms.map((t, i) => (
                                        <span key={i} className="text-[10px] bg-red-500/10 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded flex items-center gap-1 border border-red-500/20">
                                            {t} <button onClick={() => setExcludeTerms(excludeTerms.filter((_, idx) => idx !== i))} className="hover:text-red-800"><X size={8}/></button>
                                        </span>
                                    ))}
                                    <input 
                                        className="bg-transparent text-xs outline-none flex-1 min-w-[60px] text-zinc-900 dark:text-white placeholder-zinc-400"
                                        placeholder="Exclude (Recruiter...)"
                                        value={excludeInput}
                                        onChange={e => setExcludeInput(e.target.value)}
                                        onKeyDown={addExcludeTerm}
                                    />
                                </div>
                            </div>
                         ) : (
                             <button 
                                onClick={() => setShowExclude(true)}
                                className="flex items-center gap-2 text-[10px] text-zinc-500 hover:text-zinc-800 dark:text-gray-500 dark:hover:text-gray-300 w-fit px-1"
                             >
                                 <Filter size={10} /> Add Exclusions
                             </button>
                         )}

                        {/* Stats & Export Bar */}
                        <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-100 dark:bg-zinc-900/50 rounded-lg border border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-center gap-3 text-[10px] text-zinc-500">
                                <span className="flex items-center gap-1">
                                    <Code2 size={10} />
                                    <span className="font-medium text-zinc-700 dark:text-zinc-300">{skills.length}</span> skills
                                </span>
                                {usedAI && (
                                    <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                                        <Sparkles size={10} /> AI
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-1">
                                <button onClick={copyToClipboard} className="p-1.5 bg-zinc-700 hover:bg-zinc-600 rounded text-white transition-colors" title="Copy Boolean String">
                                    {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                                </button>
                                <button onClick={() => setGenerated('Your Boolean search string will appear here...')} className="p-1.5 bg-red-600 hover:bg-red-500 rounded text-white transition-colors" title="Clear Output">
                                    <Trash2 size={12} />
                                </button>
                                <button 
                                    onClick={exportAsCSV}
                                    className="px-2 py-1 text-[9px] bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded transition-colors"
                                    title="Export as CSV"
                                    disabled={!generated || generated === 'Your Boolean search string will appear here...'}
                                >
                                    CSV
                                </button>
                            </div>
                        </div>

                        <div className="bg-zinc-900 dark:bg-black rounded-lg border border-zinc-800 dark:border-white/10 mt-1 p-4 min-h-[200px]">
                            <pre className="text-green-400 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words">
                                {generated}
                            </pre>
                        </div>
                    </>
                ) : (
                    // ANALYZER MODE
                    <div className="h-full flex flex-col gap-3">
                        <div className="flex-1 relative min-h-0">
                            <textarea 
                                className="w-full h-full bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-lg p-3 text-xs text-zinc-900 dark:text-white font-mono resize-none focus:border-purple-500 outline-none leading-relaxed"
                                placeholder="Paste Job Description here or upload PDF below..."
                                value={jdText}
                                onChange={(e) => setJdText(e.target.value)}
                            />
                            <div className="absolute top-2 right-2">
                                <label className="cursor-pointer p-1.5 bg-zinc-700 hover:bg-zinc-600 rounded text-white transition-colors flex items-center gap-1 text-[10px]" title="Upload PDF">
                                    <input 
                                        type="file" 
                                        accept=".pdf" 
                                        onChange={handlePdfUpload}
                                        className="hidden" 
                                    />
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.413V13H5.5z"/>
                                    </svg>
                                    PDF
                                </label>
                            </div>
                        </div>
                        <button 
                            onClick={runAnalysis}
                            disabled={!jdText.trim()}
                            className="bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-white dark:text-black text-xs font-bold py-2.5 rounded-lg uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                            >
                            <Sparkles size={14} /> Analyze & Extract
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};


interface TiltCardProps {
  project: Project;
  className?: string;
  onClick: (project: Project) => void;
}

const TiltCard: React.FC<TiltCardProps> = ({ project, className, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [needsPermission, setNeedsPermission] = useState(false);

  const isTool = project.id === 'boolean';

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    checkMobile();
    
    const handleOrientation = (event: DeviceOrientationEvent) => {
        if (!isMobile || !cardRef.current) return;
        const gamma = event.gamma || 0; 
        const beta = event.beta || 0;
        const limit = isTool ? 1 : 15;
        setRotation({ 
            x: Math.max(Math.min(beta - 45, limit), -limit) * -1, 
            y: Math.max(Math.min(gamma, limit), -limit) 
        });
    };

    if (window.DeviceOrientationEvent && isMobile) {
      // Check if permission is needed (iOS 13+)
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        setNeedsPermission(true);
      } else {
        // Non-iOS or older iOS - just add listener
        window.addEventListener("deviceorientation", handleOrientation);
      }
    }
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [isMobile, isFocused, isTool]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current || isFocused) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const limit = isTool ? 1 : 15;
    
    // Standard tilt physics: Mouse top -> RotateX positive (top back)
    const rotateX = ((y - centerY) / centerY) * -limit; 
    const rotateY = ((x - centerX) / centerX) * limit;

    setRotation({ x: rotateX, y: rotateY });
  };

  const requestMotionPermission = async () => {
    console.log('Requesting motion permission...');
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      console.log('Permission API available');
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        console.log('Permission result:', permission);
        if (permission === 'granted') {
          setNeedsPermission(false);
          const handleOrientation = (event: DeviceOrientationEvent) => {
            if (!isMobile || !cardRef.current) return;
            const gamma = event.gamma || 0; 
            const beta = event.beta || 0;
            const limit = isTool ? 1 : 15;
            console.log('Gyro:', gamma, beta);
            setRotation({ 
              x: Math.max(Math.min(beta - 45, limit), -limit) * -1, 
              y: Math.max(Math.min(gamma, limit), -limit) 
            });
          };
          window.addEventListener("deviceorientation", handleOrientation);
        }
      } catch (error) {
        console.log('Permission error:', error);
      }
    } else {
      console.log('Permission API NOT available - probably not iOS');
    }
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsFocused(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={cardRef}
      onClick={() => {
        if (needsPermission && isMobile) {
          requestMotionPermission();
        }
        if (!isTool) onClick(project);
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
      className={`clickable group relative min-h-[500px] h-auto w-full cursor-default ${!isTool ? 'cursor-pointer active:scale-[0.98] transition-transform' : ''} ${className}`}
    >
      {/* LAYER 0: Floor */}
      <div 
        className="absolute inset-0 bg-zinc-100/80 dark:bg-black/90 backdrop-blur-xl rounded-2xl border border-zinc-300 dark:border-white/10 overflow-hidden transition-colors duration-500 group-hover:border-zinc-400 dark:group-hover:border-white/30 group-hover:shadow-2xl dark:group-hover:shadow-[0_0_50px_rgba(255,255,255,0.05)] h-full"
        style={{ transform: 'translateZ(0px)' }}
      >
        <div className="absolute inset-0 bg-[size:40px_40px] opacity-30 group-hover:opacity-50 transition-opacity duration-500 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]" />
      </div>

      {/* LAYER 1: Content */}
      <div className="relative h-full min-h-full p-8 md:p-10 flex flex-col justify-between pointer-events-none">
        
        {/* Header - Floats */}
        <div 
            className="transition-transform duration-300 ease-out"
            style={{ transform: (isHovered && !isFocused && !isTool) ? 'translateZ(100px)' : 'translateZ(0px)' }}
        >
            <div className="flex justify-between items-start mb-6">
                <div 
                    className="text-zinc-400 dark:text-white/50 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-300"
                    style={{ transform: (isHovered && !isFocused && !isTool) ? 'translateZ(25px)' : 'translateZ(0px)' }}
                >
                    {iconMap[project.id]}
                </div>
                {!isTool && (
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-blue-500 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded">
                            Click to explore →
                        </span>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-3 mb-2">
                <h3 className="text-4xl md:text-5xl font-bold font-syne text-zinc-900 dark:text-white drop-shadow-xl">
                     {project.title}
                </h3>
                {isTool && (
                    <span className="text-xs font-mono text-green-500 dark:text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-1 rounded">
                        TRY IT
                    </span>
                )}
            </div>
             <p className="text-base text-zinc-500 dark:text-gray-400 font-light">
                {project.description}
            </p>
        </div>

        {/* Middle/Bottom Area */}
        <div 
            className="flex-1 relative z-10 mt-4 transition-transform duration-300 ease-out flex flex-col min-h-0"
            style={{ transform: (isHovered && !isFocused && !isTool) ? 'translateZ(50px)' : 'translateZ(0px)' }}
        >
            {isTool ? (
                <BooleanTool onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} />
            ) : (
                <div className="h-full flex flex-col justify-end">
                     <div className="grid grid-cols-2 gap-4 mb-8 border-t border-zinc-300 dark:border-white/10 pt-6">
                        {project.stats.map((stat, i) => (
                            <div key={i}>
                                <div className="text-xs text-zinc-400 dark:text-gray-500 font-mono uppercase tracking-widest mb-1">{stat.label}</div>
                                <div className="text-xl font-syne font-bold text-zinc-900 dark:text-white transition-colors">{stat.value}</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between">
                         <div className="flex flex-wrap gap-2">
                            {project.tech.map(t => (
                                <span key={t} className="text-xs text-zinc-500 dark:text-gray-500 font-mono bg-white/50 dark:bg-black/50 px-2 py-1 rounded backdrop-blur-md border border-black/5 dark:border-white/5">
                                    //{t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

interface WorkProps {
  onOpenProject: (project: Project) => void;
}

export const Work: React.FC<WorkProps> = ({ onOpenProject }) => {
  return (
    <section id="work" className="relative py-32 px-4 overflow-hidden">
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-zinc-300/50 dark:bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[600px] h-[600px] bg-zinc-300/50 dark:bg-gray-800/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
           <h2 className="text-6xl md:text-8xl font-bold font-syne mb-6 uppercase text-zinc-900 dark:text-white">
            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-gray-500">Projects</span>
           </h2>
           <p className="text-xl md:text-2xl opacity-70 max-w-3xl font-light border-l-4 border-zinc-900/20 dark:border-white/20 pl-6 text-zinc-600 dark:text-gray-300">
             AI-powered recruiting solutions. Born from daily frustrations, engineered for efficiency.
           </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <TiltCard 
                key={project.id} 
                project={project}
                onClick={onOpenProject}
                className="md:col-span-2"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
