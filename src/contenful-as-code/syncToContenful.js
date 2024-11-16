import contenfulManagement from 'contentful-management'
import fs from 'fs'
import path from 'path'

const config = {
    managementToken : "CFPAT-AYIsqXPEOhduVbe_HSqoJ9vtS-TJiAqGkfxX1OWoeWU",
    spaceId: "scjk1gmz0ksd"
};
const client = contenfulManagement.createClient({
    accessToken: config.managementToken,
});

async function syncModelsFromCode() {
    const space = await client.getSpace(config.spaceId);
    const environment = await space.getEnvironment('master');
    //const blogModel = fs
    // Read each model file in the /models directory
    const modelFiles = fs.readdirSync(path.resolve(__dirname, 'content-models'));

    for (const file of modelFiles) {
        const model = import(`./models/${file}`);
        let contentType;
        try {
            // Try to get the content type if it exists
            contentType = await environment.getContentType(file);
            contentType.name = model.name;
            contentType.fields = model.fields;
            await contentType.update();
            console.log(`Updated content type: ${model.id}`);
        } catch (error) {
            // If the content type does not exist, create it
            if (error.name === 'NotFound') {
                contentType = await environment.createContentTypeWithId(model.id, {
                    name: model.name,
                    fields: model.fields,
                });
                console.log(`Created content type: ${model.id}`);
            } else {
                console.error(`Error with content type ${model.id}:`, error);
                continue;
            }
        }
        // Publish the content type if it was created or updated
        await contentType.publish();
        //environment.createContentTypeWithId("BlogPostModel", blogModel);
    }
}

syncModelsFromCode().catch(error => console.log("Error syncing models", error));