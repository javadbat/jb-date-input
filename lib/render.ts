export function renderHTML(): string {
  return /* html */ `
    <div class="jb-date-input-web-component">
        <jb-input disable-auto-validation part="input">
            <div class="date-input-end-section" slot="end-section">
                <div class="calendar-trigger" tabindex="0" >
                    <slot name="calendar-trigger-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" id="CalendarIcon" viewBox="0 0 44.97 44.46">
                            <defs>
                                <style></style>
                            </defs>
                            <g>
                                <path id="Path_11948" data-name="Path 11948" class="cls-1" d="M41.91,12H3.67C2,12,.61,12.59.61,13.37S2,14.78,3.67,14.78H41.91c1.69,0,3.06-.63,3.06-1.41S43.6,12,41.91,12Z" transform="translate(0 0)"/>
                                <path id="Path_11946" data-name="Path 11946" class="cls-1" d="M33.73,2.22H33V1.36A1.58,1.58,0,0,0,31.33,0a1.61,1.61,0,0,0-1.69,1.36v.86l-5.88,0V1.48A1.46,1.46,0,0,0,22.31,0h-.12a1.59,1.59,0,0,0-1.7,1.48v.74l-6.07,0V1.36A1.6,1.6,0,0,0,12.76,0C11.93,0,11,.61,11,1.36v.89C4.87,2.58,0,7.18,0,12.79v21.1c0,5.83,5.24,10.57,11.68,10.57h21.6C39.73,44.46,45,39.72,45,33.89V12.79C45,7,40.17,2.22,33.73,2.22ZM42,33.89c0,4.33-3.89,7.85-8.68,7.85H11.69C6.9,41.74,3,38.22,3,33.89V12.79C3,8.67,6.53,5.29,11,5v.68C11,6.4,12,7,12.76,7a1.63,1.63,0,0,0,1.67-1.36V4.93h6.06v.85c0,.75,1,1.23,1.71,1.23s1.56-.48,1.56-1.23V4.93h5.88v.72A1.62,1.62,0,0,0,31.33,7,1.59,1.59,0,0,0,33,5.65V4.93h.3c4.79,0,8.68,3.53,8.68,7.86Z"/>
                            </g>
                        </svg>
                    </slot>
                </div>
            </div>
            <!-- <slot name="end-section"></slot> -->
        </jb-input>
        <jb-popover part="popover">
            <jb-calendar tabindex="0" part="calendar"></jb-calendar>
        </jb-popover>
    </div>
  `;
}