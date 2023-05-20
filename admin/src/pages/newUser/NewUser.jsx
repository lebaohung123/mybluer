import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./newUser.css";

export default function NewUser() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setaddress] = useState("");
    const [gender, setGender] = useState("male");
    const [errors, setErrors] = useState({});

    const history = useHistory();

    const handleCreateUser = async (e) => {
        e.preventDefault();
        const formErrors = {};
      
        if (fullname.trim() === "") {
          formErrors.fullname = "Full Name is required";
        }
      
        if (username.trim() === "") {
          formErrors.username = "User Name is required";
        }
      
        if (email.trim() === "") {
          formErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          formErrors.email = "Invalid email address";
        }
      
        if (password.trim() === "") {
          formErrors.password = "Password is required";
        }
      
        if (Object.keys(formErrors).length > 0) {
          setErrors(formErrors);
          return;
        }
      
        const dataUser = {
          fullname: fullname,
          email: email,
          password: password,
          username: username,
          gender: gender,
          mobile: mobile,
          address: address,
        };
        const url = `http://localhost:5000/api/data/user/newuser`;
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataUser),
        });
        history.push("/users");
      };
      
    return (
        <div className="newUser">
            <h1 className="newUserTitle">New User</h1>
            <form className="newUserForm">
                <div className="newUserItem">
                    <label>Full Name</label>
                    <input
                        type="text"
                        placeholder="John Smith"
                        onChange={e => setFullname(e.target.value)}
                    />
                    {errors.fullname && (
                        <p className="errorText">{errors.fullname}</p>
                    )}
                </div>
                <div className="newUserItem">
                    <label>User Name</label>
                    <input
                        type="text"
                        placeholder="example_123"
                        onChange={e => setUsername(e.target.value)}
                    />
                    {errors.username && (
                        <p className="errorText">{errors.username}</p>
                    )}
                </div>
                <div className="newUserItem">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="john@gmail.com"
                        onChange={e => setEmail(e.target.value)}
                    />
                    {errors.email && (
                        <p className="errorText">{errors.email}</p>
                    )}
                </div>
                <div className="newUserItem">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    {errors.password && (
                        <p className="errorText">{errors.password}</p>
                    )}
                </div>
                <div className="newUserItem">
                    <label>Mobile</label>
                    <input
                        type="text"
                        placeholder="Number Phone"
                        onChange={e => setMobile(e.target.value)}
                    />
                </div>
                <div className="newUserItem">
                    <label>Adress</label>
                    <input
                        type="text"
                        placeholder="Adress"
                        onChange={e => setaddress(e.target.value)}
                    />
                </div>
                <div className="newUserItem">
                    <div className="rdb">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio1"
                                defaultValue="option1"
                                checked={gender === "male"}
                                onChange={e => setGender("male")}
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
                                checked={gender === "female"}
                                onChange={e => setGender("female")}
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
                                checked={gender === "other"}
                                onChange={e => setGender("other")}
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
                <div className="newUserItem">
                    <button
                        className="newUserButton"
                        onClick={e => handleCreateUser(e)}
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}
