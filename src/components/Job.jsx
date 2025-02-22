// svg
import noLogo from "../assets/svg/no-logo.svg";
import mapPin from "../assets/svg/map_pin.svg";
// scss
import "../scss/job.scss";
// react
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getLogoOfCompanies } from "../utils/fetchData";
const Job = ({
  city,
  company,
  country,
  county,
  job_link,
  job_title,
  remote
}) => {
  const [logoData, setLogoData] = useState([]);

  // fetch data for logo
  useEffect(() => {
    const fetchLogoData = async () => {
      const logoData = await getLogoOfCompanies();
      setLogoData(logoData);
    };

    fetchLogoData();
  }, []);


  function displayLocation(cities) {
    return cities
      ? cities[0].toLowerCase() === "all"
        ? "Toate orasele"
        : cities.length > 5
        ? `${cities.slice(0, 5).join(", ")} + ${cities.length - 5}`
        : cities.join(", ")
      : remote.join(", ");
  }

  const renderCompanyLogo = (companyName) => {
    // check if copmany name is the same as logo name
    const company = logoData.find((item) => item.name === companyName);
    if (company) {
      return company.logo;
    } else {
      // If company logo doesn't exist return "noLogo" placeholder
      return noLogo;
    }
  };

  return (
    <div className="card">
      <div className="container-logo">
        <img
          className="company-logo"
          src={renderCompanyLogo(company !== undefined && company[0])}
          alt={company}
          onError={(e) => (e.target.src = noLogo)}
        />
      </div>

      <div className="card-info">
        <p className="company-name">{company}</p>
         <h2 className="job-title">{job_title}</h2>
      <p className="location">
        <img src={mapPin} alt="map pin" className="icon" />
        {displayLocation(city)}
      </p>
        <a
          className="btn"
          rel="noopener noreferrer"
          target="_blank"
          href={job_link}
        >
          Către site
        </a>
      </div>

    </div>
  );
};
export default Job;
