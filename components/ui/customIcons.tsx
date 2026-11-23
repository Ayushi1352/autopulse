import type { IconBaseProps } from "react-icons";

/*
  Icons drawn after the design where no icon set has a close enough match. Each one draws in `currentColor`
  and takes a className (size and colour), like the react-icons ones.
*/

type Props = IconBaseProps;

const svgProps = (props: Props, viewBox = "0 0 24 24") => ({
  viewBox,
  className: props.className,
  "aria-hidden": true as const,
  xmlns: "http://www.w3.org/2000/svg",
});

const line = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** About "10+ Years of Experience": a car seen from the front-left with a gear in front of it */
export const ApCarGear = (props: Props) => (
  <svg {...svgProps(props, "0 0 64 48")} fill="currentColor">
    <defs>
      <mask id="ap-car-gear-cut">
        <rect width="64" height="48" fill="white" />
        <circle cx="46" cy="30" r="19" fill="black" />
        {/* headlight and grille */}
        <rect x="7.2" y="25.4" width="11.6" height="5.6" rx="2.8" fill="black" />
        <rect x="22" y="31.8" width="12" height="3.2" rx="1.6" fill="black" />
      </mask>
      <mask id="ap-car-gear-ring">
        <rect width="64" height="48" fill="white" />
        <circle cx="46" cy="30" r="8.4" fill="black" />
        <circle cx="46" cy="30" r="6" fill="white" />
      </mask>
    </defs>
    <g mask="url(#ap-car-gear-cut)">
      {/* roof and windscreen, bonnet and front, the wheel */}
      <path d="M8.5 19.5 14 8.2C15 6.2 16.6 5.2 18.8 5.2H45C47.4 5.2 49 6.6 49.8 8.8L52.6 17H48.2L45.8 10.4C45.4 9.4 44.8 9 43.8 9H19.6C18.6 9 18 9.4 17.5 10.4L13.4 19.5Z" />
      <path d="M5.6 20.5H44.4C46.4 20.5 48 22.1 48 24.1V35.6C48 37.4 46.6 38.8 44.8 38.8H6.4C4.6 38.8 3.2 37.4 3.2 35.6V22.9C3.2 21.6 4.3 20.5 5.6 20.5Z" />
    </g>
    <circle cx="12" cy="40.5" r="6.2" />
    {/* the gear: teeth, an open ring and a solid middle */}
    <path mask="url(#ap-car-gear-ring)" d="M57.73 25.41L58.01 26.19L61.79 27.44L61.79 32.56L58.01 33.81L57.54 35.05L57.19 35.8L58.98 39.36L55.36 42.98L51.8 41.19L50.59 41.73L49.81 42.01L48.56 45.79L43.44 45.79L42.19 42.01L40.95 41.54L40.2 41.19L36.64 42.98L33.02 39.36L34.81 35.8L34.27 34.59L33.99 33.81L30.21 32.56L30.21 27.44L33.99 26.19L34.46 24.95L34.81 24.2L33.02 20.64L36.64 17.02L40.2 18.81L41.41 18.27L42.19 17.99L43.44 14.21L48.56 14.21L49.81 17.99L51.05 18.46L51.8 18.81L55.36 17.02L58.98 20.64L57.19 24.2Z" />
  </svg>
);

/** "Our Mission" tab: a mountain with a snow line and a flag on its top */
export const ApMountainFlag = (props: Props) => (
  <svg {...svgProps(props)} {...line} strokeWidth={1.6}>
    <path d="M1.6 22.4 10.4 8.4l8.8 14Z" />
    <path d="m5.6 15.2 2.2 2 2.6-2.6 2.6 2.6 2.2-2" />
    <path d="M10.4 8.4V1.6h7.6l-2 2.5 2 2.5h-7.6" />
  </svg>
);

/** "Our Vision" card: an eye with three short rays above it and a soft orange pupil */
export const ApEyeRays = (props: Props) => (
  <svg {...svgProps(props)}>
    <g {...line} strokeWidth={1.7}>
      <path d="M1.8 15.4C4.6 11.4 8 9.4 12 9.4s7.4 2 10.2 6c-2.8 4-6.2 6-10.2 6s-7.4-2-10.2-6Z" />
      <circle cx="12" cy="15.4" r="4.3" />
      <path d="M12 3.4v2.8M6.6 5.2l1.3 2.2M17.4 5.2l-1.3 2.2" />
    </g>
    <circle cx="12" cy="15.4" r="1.6" fill="currentColor" opacity="0.55" />
  </svg>
);

/** "Brake Service": a brake disc with its hub and bolt holes, and the calliper round its top-right */
export const ApBrakeDisc = (props: Props) => (
  <svg {...svgProps(props)}>
    <defs>
      {/* the hub's rings and bolt holes are cut out of the disc, so they show the background behind the icon */}
      <mask id="ap-brake-disc-cut">
        <rect width="24" height="24" fill="white" />
        <g fill="none" stroke="black" strokeWidth="0.7">
          <circle cx="11.2" cy="12.8" r="4.6" />
          <circle cx="11.2" cy="12.8" r="2" />
        </g>
        <g fill="black">
          <circle cx="11.2" cy="12.8" r="0.8" />
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <circle key={angle} cx={11.2 + 3.25 * Math.cos((angle * Math.PI) / 180)} cy={12.8 + 3.25 * Math.sin((angle * Math.PI) / 180)} r="0.55" />
          ))}
        </g>
      </mask>
    </defs>
    <circle cx="11.2" cy="12.8" r="8.6" fill="currentColor" mask="url(#ap-brake-disc-cut)" />
    <path d="M12.4 2.6a10.6 10.6 0 0 1 9.4 9.6h-2.4a8.2 8.2 0 0 0-7-7.2Z" {...line} strokeWidth={1.2} />
    <path d="m18.6 4.9-1.7 1.7" {...line} strokeWidth={1.2} />
  </svg>
);

/** "Timing Belt Replacement": three pulleys with the belt round them */
export const ApTimingBelt = (props: Props) => (
  <svg {...svgProps(props)} {...line} strokeWidth={1.5}>
    <path d="M8.56 2.67L20.19 6.87A2.9 2.9 0 0 1 21.98 10.43L19.34 19.31A3.9 3.9 0 0 1 12.63 20.73L3.49 9.98A4.6 4.6 0 0 1 8.56 2.67Z" />
    <circle cx="7" cy="7" r="2.6" />
    <circle cx="7" cy="7" r="0.9" />
    <circle cx="19.2" cy="9.6" r="1.3" />
    <circle cx="15.6" cy="18.2" r="2" />
    <circle cx="15.6" cy="18.2" r="0.7" />
  </svg>
);

/** "Experienced Technicians": a round award with a star and two ribbons */
export const ApAwardStar = (props: Props) => (
  <svg {...svgProps(props)}>
    <g {...line} strokeWidth={1.4}>
      <circle cx="12" cy="9" r="6.6" />
      <path d="M8.3 14.5 5.6 20.8l2.9-.9 1.6 2.5 2-6M15.7 14.5l2.7 6.3-2.9-.9-1.6 2.5-2-6" />
      <path d="M9.4 4.1a5.4 5.4 0 0 1 5.2 0" strokeWidth={0.8} />
    </g>
    <path d="M12 5.7L12.85 7.83L15.14 7.98L13.38 9.45L13.94 11.67L12 10.45L10.06 11.67L10.62 9.45L8.86 7.98L11.15 7.83Z" fill="currentColor" />
  </svg>
);

/** "Genuine Parts": a car seen from the front with a round check badge on its bottom-right */
export const ApCarCheck = (props: Props) => (
  <svg {...svgProps(props)}>
    <defs>
      <mask id="ap-car-check-cut">
        <rect width="24" height="24" fill="white" />
        <circle cx="18.6" cy="17.6" r="5.4" fill="black" />
      </mask>
    </defs>
    <g {...line} strokeWidth={1.4} mask="url(#ap-car-check-cut)">
      <path d="M5.6 10.2 7.4 5.6c.3-.8 1-1.2 1.8-1.2h7.6c.8 0 1.5.4 1.8 1.2l1.8 4.6" />
      <path d="M4.6 10.2h16.8c.8 0 1.4.6 1.4 1.4v5.2c0 .8-.6 1.4-1.4 1.4H4.6c-.8 0-1.4-.6-1.4-1.4v-5.2c0-.8.6-1.4 1.4-1.4ZM5.2 18.2v2.2M20.8 18.2v2.2M3.4 9.2 2 8.6M22.6 9.2l1.4-.6" />
      <path d="M5.6 13h2.6M17.8 13h2.6M9.8 15.4h6.4" />
    </g>
    <g {...line} strokeWidth={1.3}>
      <circle cx="18.6" cy="17.6" r="4.1" />
      <path d="m16.8 17.7 1.3 1.3 2.4-2.6" />
    </g>
  </svg>
);

/** "Customer Satisfaction": three people side by side over three stars */
export const ApUsersStars = (props: Props) => (
  <svg {...svgProps(props)} fill="currentColor">
    <defs>
      <mask id="ap-users-stars-cut">
        <rect width="24" height="24" fill="white" />
        <circle cx="12" cy="5.4" r="3.6" fill="black" />
        <path d="M6.3 14V12.6C6.3 9.6 8.8 8.2 12 8.2s5.7 1.4 5.7 4.4V14Z" fill="black" stroke="black" strokeWidth="1.6" />
      </mask>
    </defs>
    <g mask="url(#ap-users-stars-cut)">
      <circle cx="5" cy="6.4" r="2.3" />
      <circle cx="19" cy="6.4" r="2.3" />
      <path d="M1 14v-1.4c0-2.2 1.8-3.4 4-3.4s4 1.2 4 3.4V14ZM15 14v-1.4c0-2.2 1.8-3.4 4-3.4s4 1.2 4 3.4V14Z" />
    </g>
    <circle cx="12" cy="5.4" r="2.8" />
    <path d="M7.1 14v-1.4c0-2.6 2.2-3.8 4.9-3.8s4.9 1.2 4.9 3.8V14Z" />
    <path d="M5 16.5L5.79 18.51L7.95 18.64L6.28 20.02L6.82 22.11L5 20.95L3.18 22.11L3.72 20.02L2.05 18.64L4.21 18.51ZM12 16.5L12.79 18.51L14.95 18.64L13.28 20.02L13.82 22.11L12 20.95L10.18 22.11L10.72 20.02L9.05 18.64L11.21 18.51ZM19 16.5L19.79 18.51L21.95 18.64L20.28 20.02L20.82 22.11L19 20.95L17.18 22.11L17.72 20.02L16.05 18.64L18.21 18.51Z" />
  </svg>
);

/** "Years of Experience" in the numbers band: a calendar outline with two rows of solid squares */
export const ApCalendarGrid = (props: Props) => (
  <svg {...svgProps(props)}>
    <g {...line} strokeWidth={1.6}>
      <rect x="3.2" y="4.6" width="17.6" height="16.6" rx="2.4" />
      <path d="M8 2.6v3.6M16 2.6v3.6" />
    </g>
    <g fill="currentColor">
      {[7.1, 10.8, 14.5].flatMap((x) => [10.6, 14.6].map((y) => <rect key={`${x}-${y}`} x={x} y={y} width="2.4" height="2.4" rx="0.5" />))}
    </g>
  </svg>
);

/** "Book a Service" heading: an outline sedan seen from the side (wide, like the design's) */
export const ApSedan = (props: Props) => (
  <svg {...svgProps(props, "0 0 164 70")} {...line} strokeWidth={5.5}>
    <path d="M14 53H5.5c-2.2 0-3.7-1.6-3.7-3.7v-9c0-4.4 1.6-7.6 4.6-9.6C8.6 25.6 11 23.4 16 23l29.5-1C56 9 63 4 73 4h22c11 0 20 6 33 17.5l17.5 2.6c8 1.4 14.5 4.8 14.5 10.4V50c0 1.8-1.4 3-3 3H150" />
    <circle cx="32" cy="52" r="13" />
    <circle cx="129.5" cy="52" r="13" />
    <path d="M51.5 54.5h56M47.5 22.5h68M84 15.5v6.5M66.5 41h21.5M101 38.5l14-7.5" />
  </svg>
);
