// 'use client'

// import { MESS_ID } from "@/constants/mess.constants"
// import { PDDU_QR_code_form } from "@/component/mess/PDDU_QR_code_form"

// export default function page() {
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
//             <PDDU_QR_code_form messId={MESS_ID.mess2} />
//         </div>
//     )
// }

'use client';

import { MESS_ID } from "@/constants/mess.constants";
import { QRCodeForm } from '@/component/mess/QRCodeForm';

export default function QRCodeFormPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
            <QRCodeForm messId={MESS_ID.mess2} />
        </div>
    );
}