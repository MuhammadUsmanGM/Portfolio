


import { NextResponse } from 'next/server';



export async function GET() {

    console.log("Social API route hit");

    const socialLinks = {

        success: true,

        links: {

            email: 'muhammadusman5965etc@gmail.com',

            github: 'https://github.com/MuhammadUsmanGM',

            linkedin: 'https://www.linkedin.com/in/muhammad-usman-099704390?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',

            phone: '+92 325 6550687'

        }

    };

    console.log("Returning social links:", socialLinks);

    return NextResponse.json(socialLinks);

}
