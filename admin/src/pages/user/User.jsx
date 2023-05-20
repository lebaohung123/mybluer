import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
} from "@material-ui/icons";
import "./user.css";
import Loading from "../../components/loading/Loading";

export default function User() {
    const [data, setData] = useState({});
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [radio, setRadio] = useState("");
    const [imgDefault, setImgDefault] = useState("");
    const [linkImage, setLinkImage] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [fullnameError, setFullnameError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [loading, setLoading] = useState(false);

    const history = useHistory();
    let { userId } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/api/data/user/${userId}`)
            .then(response => response.json())
            .then(result => {
                setData(result);
                setFullname(result.fullname);
                setEmail(result.email);
                setMobile(result.mobile);
                setAddress(result.address);
                setRadio(result.gender);
                setImgDefault(result.avatar);
                setLinkImage(result.avatar);
            })
            .catch(err => console.log(err));
        return () => {
            setData({});
        };
    }, []);

    const handleUpImage = async images => {
        setLoading(true);
        setImgDefault(URL.createObjectURL(images.target.files[0]));
        let imgArr = [];
        const formData = new FormData();

        formData.append("file", images.target.files[0]);
        formData.append("upload_preset", "zzimaj7n");
        formData.append("cloud_name", "dkwl9cttg");

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dkwl9cttg/image/upload",
            {
                method: "POST",
                body: formData,
            }
        );

        const result = await res.json();
        imgArr.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
        setLinkImage(imgArr[0].url);
        setLoading(false);
    };

    const handleSubmitForm = async e => {
        try {
            e.preventDefault();
            const url = `http://localhost:5000/api/data/user/${userId}/edit`;

            // Perform fullname validation
            if (fullname.trim() === "") {
                setFullnameError("Fullname is required");
                return;
            } else {
                setFullnameError("");
            }

            // Perform email validation
            if (email.trim() === "") {
                setEmailError("Email is required");
                return;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setEmailError("Invalid email address");
                return;
            } else {
                setEmailError("");
            }

            // Perform phone validation
            if (mobile.trim() === "") {
                setPhoneError("Phone is required");
                return;
            } else if (!/^[0-9]{10}$/.test(mobile)) {
                setPhoneError("Invalid phone number");
                return;
            } else {
                setPhoneError("");
            }

            // Perform address validation
            if (address.trim() === "") {
                setAddressError("Address is required");
                return;
            } else {
                setAddressError("");
            }

            const formData = {
                fullname: fullname,
                email: email,
                mobile: mobile,
                address: address,
                gender: radio,
                imgFile: linkImage,
            };
            const call = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (call) {
                await history.push("/users");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="user">
            {loading ? (
                <Loading />
            ) : (
                <div className="userContainer">
                    <div className="userShow">
                        <div className="userShowTop">
                            <img
                                src={data.avatar}
                                alt=""
                                className="userShowImg"
                            />
                            <div className="userShowTopTitle">
                                <span className="userShowUsername">
                                    {data.fullname}
                                </span>
                                <span className="userShowUserTitle">
                                    {data.occupation}
                                </span>
                            </div>
                        </div>
                        <div className="userShowBottom">
                            <span className="userShowTitle">
                                Account Details
                            </span>
                            <div className="userShowInfo">
                                <PermIdentity className="userShowIcon" />
                                <span className="userShowInfoTitle">
                                    {data.email}
                                </span>
                            </div>
                            <div className="userShowInfo">
                                <CalendarToday className="userShowIcon" />
                                <span className="userShowInfoTitle">
                                    {data.role}
                                </span>
                            </div>
                            <span className="userShowTitle">
                                Contact Details
                            </span>
                            <div className="userShowInfo">
                                <PhoneAndroid className="userShowIcon" />
                                <span className="userShowInfoTitle">
                                    {data.mobile}
                                </span>
                            </div>
                            <div className="userShowInfo">
                                <MailOutline className="userShowIcon" />
                                <span className="userShowInfoTitle">
                                    {data.location}
                                </span>
                            </div>
                            <div className="userShowInfo">
                                <LocationSearching className="userShowIcon" />
                                <span className="userShowInfoTitle">
                                    {data.address}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="userUpdate">
                        <span className="userUpdateTitle">Edit</span>
                        <form className="userUpdateForm">
                            <div className="userUpdateLeft">
                                <div className="userUpdateItem">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        value={fullname}
                                        className="userUpdateInput"
                                        onChange={e =>
                                            setFullname(e.target.value)
                                        }
                                    />
                                    {fullnameError && (
                                        <span className="validationError">
                                            {fullnameError}
                                        </span>
                                    )}
                                </div>
                                <div className="userUpdateItem">
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        value={email}
                                        className="userUpdateInput"
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    {emailError && (
                                        <span className="validationError">
                                            {emailError}
                                        </span>
                                    )}
                                </div>
                                <div className="userUpdateItem">
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        value={mobile}
                                        className="userUpdateInput"
                                        onChange={e =>
                                            setMobile(e.target.value)
                                        }
                                    />
                                    {phoneError && (
                                        <span className="validationError">
                                            {phoneError}
                                        </span>
                                    )}
                                </div>
                                <div className="userUpdateItem">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        value={address}
                                        className="userUpdateInput"
                                        onChange={e =>
                                            setAddress(e.target.value)
                                        }
                                    />
                                    {addressError && (
                                        <span className="validationError">
                                            {addressError}
                                        </span>
                                    )}
                                </div>
                                <div className="userUpdateItem">
                                    <label>Gender</label>

                                    <div className="rdb">
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="inlineRadioOptions"
                                                id="inlineRadio1"
                                                defaultValue="option1"
                                                checked={radio === "male"}
                                                onChange={e => setRadio("male")}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="inlineRadio1"
                                            >
                                                Male
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="inlineRadioOptions"
                                                id="inlineRadio2"
                                                defaultValue="option2"
                                                checked={radio === "female"}
                                                onChange={e =>
                                                    setRadio("female")
                                                }
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="inlineRadio2"
                                            >
                                                Female
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="inlineRadioOptions"
                                                id="inlineRadio3"
                                                defaultValue="option3"
                                                checked={radio === "other"}
                                                onChange={e =>
                                                    setRadio("other")
                                                }
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="inlineRadio3"
                                            >
                                                Other
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="userUpdateRight">
                                <div className="userUpdateUpload">
                                    <img
                                        className="userUpdateImg"
                                        src={imgDefault}
                                        alt="avatar"
                                    />
                                    <label htmlFor="file">
                                        <Publish className="userUpdateIcon" />
                                    </label>
                                    <input
                                        type="file"
                                        id="file"
                                        style={{ display: "none" }}
                                        onChange={handleUpImage}
                                    />
                                </div>
                                <button
                                    className="userUpdateButton"
                                    onClick={handleSubmitForm}
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
