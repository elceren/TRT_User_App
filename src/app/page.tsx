"use client";

import React, {useContext, useEffect, useState} from "react";
import './styles.css';
import {DataContext, Form} from "../contexts/Data";


type CredentailProp = {
    onNavigate:any
}
function Button({ onClick, children }) {
    return <button onClick={onClick}>{children}</button>;
}
const Header = ({ onNavigate }) => (
    <header className="header" style={{ display: 'flex', alignItems: 'center', padding: '0 20px' }}>
        <Navbar onNavigate={onNavigate} />
        <h1>TRT</h1>
    </header>
);
import Image from 'next/image';
import homeImage from './assets/home.png';
import aboutImage from './assets/user.png';
import servicesImage from './assets/list.png';

const Navbar = ({ onNavigate }) => {
    const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
    const [menuClass, setMenuClass] = useState("menu hidden");
    const [isMenuClicked, setIsMenuClicked] = useState(false);

    const updateMenu = () => {
        if (!isMenuClicked) {
            setBurgerClass("burger-bar clicked");
            setMenuClass("menu visible");
        } else {
            setBurgerClass("burger-bar unclicked");
            setMenuClass("menu hidden");
        }
        setIsMenuClicked(!isMenuClicked);
    };

    // UseEffect to handle resize event
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && isMenuClicked) {
                setBurgerClass("burger-bar unclicked");
                //setMenuClass("menu hidden");
                setIsMenuClicked(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isMenuClicked]);

    return (
        <div className="header" style={{ display: 'flex', alignItems: 'center', padding: '0 20px' , width: '45%' }}>
            <nav>
                <div className="burger-menu" onClick={updateMenu}>
                    <div className={burgerClass}></div>
                    <div className={burgerClass}></div>
                    <div className={burgerClass}></div>
                </div>
            </nav>

            <div className={menuClass} style={{ padding: '10px', width:'20%' }}>
                <ul style={{ padding: 100, margin: 0, listStyleType: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                    <li onClick={() => onNavigate('welcome')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                        <Image src={homeImage} alt="Home" width={70} height={70} />
                        <span style={{ marginTop: '15px' }}>Home</span>
                    </li>
                    <li onClick={() => onNavigate('form')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                        <Image src={aboutImage} alt="About" width={70} height={70} />
                        <span style={{ marginTop: '15px' }}>Add User</span>
                    </li>
                    <li onClick={() => onNavigate('submission')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                        <Image src={servicesImage} alt="Services" width={70} height={70} />
                        <span style={{ marginTop: '15px' }}>All Submissions</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

interface City {
    Id: number;
    Name: string;
    Districts: District[];
}

interface District {
    Id: number;
    Name: string;
}

interface Submission {
    Id: number;
    Name: string;
    Surname: string;
    Email: string;
    PhoneNumber: string;
}

interface SubmissionListProps {
    submissions: Submission[];
}


const CitySelector = ({cities, onCityChange,}: {
    cities: City[] | undefined;
    onCityChange: (cityId: number) => void;
}) => (<select onChange={(event) => onCityChange(Number(event.target.value))}>
        <option value="-1">Şehir seçiniz</option>
        {cities?.map((city) => (
            <option key={city.Id} value={city.Id}>
                {city.Name}
            </option>
        ))}
    </select>
);

const DistrictSelector = ({districts,}: { districts: District[] | undefined; }) => (
    <select>
        <option value="-1">İlçe seçiniz</option>
        {districts?.map((district) => (
            <option key={district.Id} value={district.Id}>
                {district.Name}
            </option>
        ))}
    </select>
);

    const WelcomePage = ({ onNavigate }) => {
        const images = [
            "https://cdn-i.pr.trt.com.tr/trtportal/16403137_0-0-5469-2051.jpeg",
            "https://i.kayserianadoluhaber.com.tr/c/90/1280x720/s/dosya/haber/trt-nedir_1682947226_pqEUuB.webp",
            "https://trthaberstatic.cdn.wp.trt.com.tr/resimler/1476000/trt-turkiye-radyo-televizyon-kurumu-1476867.jpg"
        ];

            const [currentImageIndex, setCurrentImageIndex] = useState(0);

            useEffect(() => {
                const interval = setInterval(() => {
                    setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
                }, 3000); // Change the image every 3 seconds

                return () => clearInterval(interval); // Clean up the interval on component unmount
            }, [images.length]);

            return (
                <div>
                    <Header onNavigate={onNavigate} />
                    <main>
                        <h1>Welcome to the Personnel Entry Page</h1>
                        <Button onClick={() => onNavigate('form')}>Enter Data</Button>
                        <p></p>
                    </main>
                    <main>
                        <h1>View All Submissions</h1>
                        <p></p>
                        <Button onClick={() => onNavigate('submission')}>All Submissions</Button>
                    </main>
                </div>
            );
        };

        const FormPage = ({onNavigate}) => {
    const {setData} = useContext(DataContext);


    const [form, setForm] = useState<Form>();
    const [cities, setCities] = useState<City[]>();
    const [selectedCity, setSelectedCity] = useState<number>(-1);
    const [districts, setDistricts] = useState<District[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (selectedCity !== -1) {
            const _districts = cities?.find((city) => city.Id === selectedCity)?.Districts;
            setDistricts(_districts);
        } else {
            setDistricts([]);
        }
    }, [selectedCity, cities]);

    useEffect(() => {
        (async () => {
            try {
                const request = await fetch("/api/city/get");
                const response = await request.json();
                setCities(response);
            } catch (err) {
                setError("Failed to fetch cities.");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/city/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...form,
                    cityId: selectedCity,
                    districtId: districts?.[0]?.Id ?? -1,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                setData &&      setData(form)
               onNavigate('credentials');
            } else {
                const errorData = await response.json();
                console.error('Submission failed:', errorData);
                alert('Submission failed. Please try again.');
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm(form => ({ ...form, [event.target.name]: event.target.value }));
    }

    if (loading) return <div>Yükleniyor...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <Header onNavigate={onNavigate} />
            <main>
                <h1>Personel Giriş Formu</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Ad"
                        name="name"
                        onChange={handleOnChange}
                        required
                    />
                    <input
                        type="text"
                        name="surname"
                        placeholder="Soyad"
                        onChange={handleOnChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleOnChange}
                        required
                    />
                    <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Telefon numarası"
                        onChange={handleOnChange}
                        required
                    />
                    <CitySelector cities={cities} onCityChange={setSelectedCity} />
                    <DistrictSelector districts={districts} />
                    <button type="submit">Submit</button>
                </form>
            </main>
        </>
    );
};

const CredentialsPage = ({onNavigate }:CredentailProp) => {
    const {data} = useContext(DataContext);

   if (Object.keys(data).length === 0) return <div>No data available.</div>;

    return (
        <>
            <Header onNavigate={onNavigate} />
            <main>
                <h1>Submission Successful!</h1>
                <p>Name: {data.name}</p>
                <p>Surname: {data.surname}</p>
                <p>Email: {data.email}</p>
                <p>Phone Number: {data.phoneNumber}</p>
                <Button onClick={() => onNavigate('submission')}>Done</Button>
            </main>
        </>
    );

};

const SubmissionList: React.FC<SubmissionListProps> = ({ submissions }) => {
    const [submissionList, setSubList] = useState(submissions);

    const handleInputChange = (id: number, field: keyof Submission, value: string) => {
        setSubList(prevState =>
            prevState.map(submission =>
                submission.Id === id ? { ...submission, [field]: value } : submission
            )
        );
    };

    const updateSubmission = async (id: number) => {
        const submissionToUpdate = submissionList.find(submission => submission.Id === id);
        if (!submissionToUpdate) {
            console.error('Submission not found');
            return;
        }

        try {
            console.log('Updating submission:', submissionToUpdate); // Debugging log

            const response = await fetch(`/api/submissions/update`, {
                method: 'PUT',
                body: JSON.stringify(submissionToUpdate),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Failed to update submission: ${response.status} ${response.statusText} - ${errorText}`);
                return;
            }

            const updatedSubmissions = await response.json();
            setSubList(updatedSubmissions);

        } catch (error) {
            console.error('Error updating submission:', error);
        }
    };


    const deleteSubmission = async (id: number) => {
        try {
            const response = await fetch(`/api/submissions/delete`, {
                method: 'DELETE',
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to delete submission: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const updatedSubmissions = await response.json();
            setSubList(updatedSubmissions);

        } catch (error) {
            console.error('Error deleting submission:', error);
        }
    };

    return (
        <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Surname</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Email</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Phone Number</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {submissionList.map((submission) => (
                    <tr key={submission.Id}>
                        <td style={{ border: '1px solid black', padding: '8px' }}>
                            <input
                                type="text"
                                className="seamless-input"
                                placeholder="Enter text here"
                                value={submission.Name}
                                onChange={(e) => handleInputChange(submission.Id, 'Name', e.target.value)}
                            />
                        </td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>
                            <input
                                type="text"
                                className="seamless-input"
                                placeholder="Enter text here"
                                value={submission.Surname}
                                onChange={(e) => handleInputChange(submission.Id, 'Surname', e.target.value)}
                            />
                        </td>
                        <td style={{border: '1px solid black', padding: '8px' }}>
                            <input
                                type="email"
                                className="seamless-input"
                                placeholder="Enter text here"
                                value={submission.Email}
                                onChange={(e) => handleInputChange(submission.Id, 'Email', e.target.value)}
                            />
                        </td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>
                            <input
                                type="text"
                                className="seamless-input"
                                placeholder="Enter text here"
                                value={submission.PhoneNumber}
                                onChange={(e) => handleInputChange(submission.Id, 'PhoneNumber', e.target.value)}
                            />
                        </td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>
                            <button onClick={() => updateSubmission(submission.Id)}>Update</button>
                            <p></p>
                            <button onClick={() => deleteSubmission(submission.Id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

const SubmissionsPage = ({ onNavigate }) => {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/submissions/get');
            if (!response.ok) {
                throw new Error('Failed to fetch submissions');
            }
            const data = await response.json();
            setSubmissions(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <Header onNavigate={onNavigate} />
            <main>
                <h1>Submissions List</h1>
                <SubmissionList submissions={submissions} />
                <Button onClick={() => onNavigate('welcome')}>Done</Button>
            </main>
        </>
    );
};


export default function App() {
    const [currentPage, setCurrentPage] = useState<string>('welcome');
    const [data, setData] = useState<any>(null);

    const handleNavigate = (page: string, pageData?: any) => {
        setCurrentPage(page);
        if (pageData) setData(pageData);
    };

    switch (currentPage) {
        case 'welcome':
            return <WelcomePage onNavigate={handleNavigate} />;
        case 'form':
            return <FormPage onNavigate={handleNavigate} />;
        case 'credentials':
            return <CredentialsPage onNavigate={handleNavigate} />;
        case 'submission':
            return <SubmissionsPage onNavigate={handleNavigate} />;
        default:
            return <div>Page not found.</div>;
    }
}
