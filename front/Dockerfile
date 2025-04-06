# Use official Nginx image to serve the build files
FROM nginx:alpine

# Copy the locally built files into the Nginx container
COPY ./build /usr/share/nginx/html

# Expose port 80 for the nginx server
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]