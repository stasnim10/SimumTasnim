// Generated from the files in public/assets/images — do not hand-edit.
// Real intrinsic dimensions let the browser reserve the right box before
// an image arrives, which is what actually prevents layout shift.
const SIZES = {
  '/assets/images/experience/Country Project Manager 2.jpg': { width: 1204, height: 1600 },
  '/assets/images/experience/Country Project Manager.jpg': { width: 1600, height: 1196 },
  '/assets/images/experience/Founder_Product Developer.jpg': { width: 1066, height: 1600 },
  '/assets/images/experience/Strategy_Operations 2.jpg': { width: 1600, height: 900 },
  '/assets/images/experience/Strategy_Operations 3.jpg': { width: 1600, height: 900 },
  '/assets/images/experience/Strategy_Operations.jpg': { width: 1600, height: 800 },
  '/assets/images/experience/Supply Chain Leader 2.jpg': { width: 1600, height: 1199 },
  '/assets/images/experience/Supply Chain Leader 3.jpg': { width: 1600, height: 1200 },
  '/assets/images/experience/Supply Chain Leader 4.jpg': { width: 1200, height: 1600 },
  '/assets/images/experience/Supply Chain Leader.jpg': { width: 1600, height: 1051 },
  '/assets/images/experience/USOTG_CEO.jpg': { width: 1066, height: 1600 },
  '/assets/images/experience/VP_MBA Team Coach.jpg': { width: 1600, height: 1066 },
  '/assets/images/experience/experience-2018.jpg': { width: 1600, height: 1598 },
  '/assets/images/first_image_top_page.jpg': { width: 1066, height: 1600 },
  '/assets/images/products/USOTG-Store.jpg': { width: 1600, height: 900 },
  '/assets/images/products/case-quest.jpg': { width: 1600, height: 1040 },
  '/assets/images/products/zikr-poster.jpg': { width: 720, height: 1280 },
  '/assets/images/projects/project1_launchpad.jpg': { width: 1600, height: 850 },
  '/assets/images/projects/project2_transformation.jpg': { width: 1600, height: 1305 },
  '/assets/images/projects/project3_blueprint.jpg': { width: 1600, height: 1100 },
  '/assets/images/projects/project4_scheduling.jpg': { width: 1600, height: 1040 },
};

/** Returns { width, height } for an image path, ignoring any ?v= cache-buster. */
export function imageSize(src) {
  return SIZES[String(src).split('?')[0]] ?? {};
}
