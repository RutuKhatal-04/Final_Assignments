
import { Request, Response } from "express";
import axios from 'axios'; 
import Weather from "../models/appModel";

import { Op } from "sequelize";
import sequelize from "../Database/config"; 




import { sendWeatherEmail } from "../email";



//Payload passed
// {
//     "cities": [
//         { "city": "Pune", "country": "India" },
//         { "city": "Mumbai", "country": "India" },
//         { "city": "London", "country": "England" }
//     ]
// }
export const getWeatherData = async (req: Request, res: Response) => {
    const data = req.body;
    const cities = data.cities;
    const results = [];
    console.log(data)
    console.log(cities)
    for (const cityObj of cities) {
        try {
            const response = await axios.get(`https://api.api-ninjas.com/v1/geocoding`, {
                params: {
                    city: cityObj.city,
                    country: cityObj.country
                },
                headers: {
                    'X-Api-Key': 'DUiIhOdlIxkyphRuWhIyEA==d8qjTC2yxWpQNFtl'
                }
            });

            
            if (Array.isArray(response.data) && response.data.length > 0) {
                const locationData = response.data[0];
                results.push({
                    city: cityObj.city,
                    country: cityObj.country,
                    latitude: locationData.latitude,
                    longitude: locationData.longitude
                });

                const resp = await axios.get("https://weatherapi-com.p.rapidapi.com/current.json", {
                    params: {
                        q: `${locationData.latitude},${locationData.longitude}`
                    },
                    headers: {
                        'X-RapidAPI-Key': '198970f36amshaf5b8f43564041dp1abb0bjsnd75de73c8abc',
                        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                    }
                });

                
                const weatherData = resp.data as { current: { temp_c: number, condition: { text: string } } };

                results.push({
                    city: cityObj.city,
                    country: cityObj.country,
                    latitude: locationData.latitude,
                    longitude: locationData.longitude,
                    weather: `${weatherData.current.condition.text}`
                });

                
                await Weather.create({
                    city: cityObj.city,
                    country: cityObj.country,
                    Latitude: locationData.latitude.toString(),
                    Longitude: locationData.longitude.toString(),
                    weather: ` ${weatherData.current.condition.text}`,
                    createdAt: new Date()
                });
            } else {
                console.log(`No data found for city: ${cityObj.city}`);
            }
        } catch (error) {
            console.log(`Error fetching data for city: ${cityObj.city}`, error);
        }
    }

    res.send(results);
    console.log(results);
};
export const getWeatherDashboard = async (req: Request, res: Response) => {
    const { city } = req.query;

    try {
        let weatherData;

        if (city) {
            weatherData = await Weather.findAll({
                where: {
                    city: {
                        [Op.iLike]: `%${city}%`
                    }
                },
                order: [['createdAt', 'DESC']]
            });
        } else {
            weatherData = await Weather.findAll({
                attributes: [
                    'id',
                    'city',
                    'country',
                    'weather',
                    [sequelize.fn('MAX', sequelize.col('createdAt')), 'date']
                ],
                group: ['id', 'city', 'country', 'weather'],
                order: [[sequelize.fn('MAX', sequelize.col('createdAt')), 'DESC']]
            });
        }

        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



export const getemailData = async (req: Request, res: Response): Promise<void> => {
    try {
      const { city } = req.body;
  
      if (!city) {
        res.status(400).json({ error: 'City is required' });
        return;
      }
  
      // Fetch data from the database
      const weatherData = await Weather.findAll({
        where: { city },
        order: [['createdAt', 'DESC']]
      });
  
      if (weatherData.length === 0) {
        res.status(404).json({ error: 'No data found for the specified city' });
        return;
      }
  
      // Format the data into an HTML table
      const emailContent = `
        <html>
        <body>
            <table border="1">
                <tr>
                    <th>Id</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>CreatedAt</th>
                    <th>UpdatedAt</th>
                    <th>Weather</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                </tr>
                ${weatherData.map(data => `
                <tr>
                    <td>${data.id}</td>
                    <td>${data.city}</td>
                    <td>${data.country}</td>
                    <td>${data.createdAt}</td>
                    <td>${data.updatedAt}</td>
                    <td>${data.weather}</td>
                    <td>${data.Latitude}</td>
                    <td>${data.Longitude}</td>
                </tr>
                `).join('')}
            </table>
        </body>
        </html>
      `;
  
      // Send the email
      sendWeatherEmail(emailContent, (error: Error | null, info: any) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: 'Failed to send email' });
        } else {
          res.status(200).json({ message: 'Email sent successfully' });
        }
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  };