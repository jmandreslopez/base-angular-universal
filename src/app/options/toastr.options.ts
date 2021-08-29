import { GlobalConfig } from 'ngx-toastr';

/**
 * Ladda Options
 */
export const ToastrOptions: Partial<GlobalConfig> = {
    timeOut: 5000,
    maxOpened: 2, // Allow max 2 alerts at the time
    preventDuplicates: true,
    countDuplicates: true,
};
