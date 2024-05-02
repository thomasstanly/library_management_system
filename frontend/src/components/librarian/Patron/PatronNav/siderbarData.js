

export const siderbarData = [
    {
        title: "Patron Details",
        link: (patronId) => `/library/patron/${patronId}`
        
    },
    {
        title: "Circulation History",
        link: (patronId) => `/library/patron/${patronId}/circulation_history`
    },
    {
        title: "Payment History",
        link: (patronId) => `/library/patron/${patronId}/payment_history`
    },
    {
        title: "Check Out",
        link: (patronId) => `/library/patron/${patronId}/checkout`
    },
]