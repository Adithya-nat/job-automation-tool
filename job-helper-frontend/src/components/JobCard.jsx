/* eslint-disable react/prop-types */
const JobCard = ({ job, onClick }) => {
  const { title, company, location, link } = job;

  return (
    <div
      className="p-4 bg-white rounded-lg shadow hover:shadow-lg cursor-pointer animate-slideIn transition ease-in-out delay-5 hover:-translate-y-1 hover:scale-110 duration-300"
      onClick={() => onClick(job)}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{company}</p>
      <p className="text-sm text-gray-500">{location}</p>
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="text-indigo-600 hover:underline mt-2 inline-block"
      >
        View Job
      </a>
    </div>
  );
};

export default JobCard;
