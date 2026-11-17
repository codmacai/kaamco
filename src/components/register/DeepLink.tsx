/** Runs before paint: when the URL targets a form, hide the intro so CTAs land straight on the form (spec §02). */
export default function DeepLink() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `if(/^#(need-manpower|find-work|supply-manpower)$/.test(location.hash))document.documentElement.classList.add('kc-deep')`,
      }}
    />
  );
}
